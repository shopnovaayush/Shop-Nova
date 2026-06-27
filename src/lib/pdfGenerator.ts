import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

export interface OrderData {
  id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  address: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
}

export const generateOrderPDF = (order: OrderData): void => {
  const doc = new jsPDF();
  
  // Header with gradient simulation
  doc.setFillColor(124, 58, 237);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Brand
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('ShopNova', 14, 20);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('India\'s Trendiest Online Shopping', 14, 27);
  
  // Order Info
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text('Order Invoice', 150, 20);
  
  doc.setFontSize(10);
  doc.text(`Order ID: ${order.id}`, 150, 28);
  doc.text(`Date: ${format(new Date(order.created_at), 'dd MMM yyyy')}`, 150, 34);
  
  // Customer Details
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Customer Details', 14, 50);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const customerDetails = [
    [`Name: ${order.user_name}`],
    [`Email: ${order.user_email}`],
    [`Phone: ${order.user_phone}`],
    [`Address: ${order.address}`],
  ];
  
  autoTable(doc, {
    startY: 55,
    body: customerDetails,
    theme: 'plain',
    styles: { fontSize: 9, cellPadding: 1 },
  });
  
  // Order Items Table
  const tableColumn = ['Product', 'Price', 'Qty', 'Total'];
  const tableRows: string[][] = [];
  
  order.items.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    tableRows.push([
      item.name,
      `₹${item.price.toLocaleString()}`,
      item.quantity.toString(),
      `₹${itemTotal.toLocaleString()}`,
    ]);
  });
  
  autoTable(doc, {
    startY: (doc as any).lastAutoTable.finalY + 10,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [124, 58, 237] },
  });
  
  // Totals
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(10);
  doc.text('Subtotal:', 150, finalY);
  doc.text(`₹${order.total.toLocaleString()}`, 190, finalY, { align: 'right' });
  
  doc.text('Delivery:', 150, finalY + 6);
  doc.text(order.total >= 199 ? 'FREE' : '₹40', 190, finalY + 6, { align: 'right' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(124, 58, 237);
  doc.text('Grand Total:', 150, finalY + 14);
  doc.text(`₹${(order.total + (order.total >= 199 ? 0 : 40)).toLocaleString()}`, 190, finalY + 14, { align: 'right' });
  
  // Payment Info
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Payment: ${order.payment_method} (${order.payment_status})`, 14, finalY + 30);
  doc.text(`Status: ${order.order_status.toUpperCase()}`, 14, finalY + 36);
  
  // Footer
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('Thank you for shopping with ShopNova!', 105, pageHeight - 15, { align: 'center' });
  doc.text('Contact: tipsactivelife@gmail.com | +91 73074 93338', 105, pageHeight - 10, { align: 'center' });
  
  doc.save(`Order_${order.id}.pdf`);
};

export const generateRevenueReportPDF = (orders: OrderData[], dateRange: { from: string; to: string }): void => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(124, 58, 237);
  doc.rect(0, 0, 210, 35, 'F');
  
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Revenue Report', 14, 20);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Period: ${format(new Date(dateRange.from), 'dd MMM')} - ${format(new Date(dateRange.to), 'dd MMM yyyy')}`, 14, 28);
  
  // Summary
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(`Total Orders: ${orders.length}`, 14, 45);
  doc.text(`Total Revenue: ₹${totalRevenue.toLocaleString()}`, 80, 45);
  doc.text(`Avg Order: ₹${avgOrderValue.toFixed(2)}`, 150, 45);
  
  // Orders Table
  const tableColumn = ['Order ID', 'Customer', 'Amount', 'Status', 'Date'];
  const tableRows: string[][] = [];
  
  orders.forEach((order) => {
    tableRows.push([
      order.id.substring(0, 8),
      order.user_name,
      `₹${order.total.toLocaleString()}`,
      order.order_status,
      format(new Date(order.created_at), 'dd MMM'),
    ]);
  });
  
  autoTable(doc, {
    startY: 55,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [124, 58, 237] },
    styles: { fontSize: 8 },
  });
  
  doc.save(`Revenue_Report_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};

export const generateProductCatalogPDF = (products: Array<{ id: number; name: string; price: number; originalPrice: number; discount: number; category: string }>): void => {
  const doc = new jsPDF();
  
  doc.setFillColor(124, 58, 237);
  doc.rect(0, 0, 210, 30, 'F');
  
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('Product Catalog', 14, 18);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${products.length} Products`, 14, 25);
  
  const tableColumn = ['Product Name', 'Category', 'Price', 'Discount'];
  const tableRows: string[][] = [];
  
  products.forEach((product) => {
    tableRows.push([
      product.name.substring(0, 50),
      product.category,
      `₹${product.price}`,
      `${product.discount}% OFF`,
    ]);
  });
  
  autoTable(doc, {
    startY: 35,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [124, 58, 237] },
    styles: { fontSize: 8 },
  });
  
  doc.save(`Product_Catalog_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};
