import { useState, useEffect } from 'react';
import {
  X, Bot, CreditCard, Database, Shield, Eye, EyeOff, Save, Check, AlertCircle,
  Loader2, ToggleLeft, ToggleRight, Lock, LogOut, ChevronRight, KeyRound,
  Palette, Megaphone, FileText, Download, Users, ShoppingCart, TrendingUp,
  Mail, Phone, MapPin, MessageCircle,
} from 'lucide-react';
import { useAdminStore, PaymentGateway } from '../store/adminStore';
import { testSupabaseConnection, initSupabase } from '../lib/supabase';
import { generateRevenueReportPDF, generateProductCatalogPDF } from '../lib/pdfGenerator';
import { products } from '../data/products';

type Tab = 'chatbot' | 'payment' | 'supabase' | 'security' | 'colors' | 'popup' | 'contact' | 'reports';

const ADMIN_SECRET_PATH = '#shopnova-admin-2024';

export default function AdminPanel() {
  const [isVisible, setIsVisible] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('chatbot');
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [testingSupabase, setTestingSupabase] = useState(false);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  const {
    isAuthenticated, login, logout, chatbot, updateChatbot, paymentGateways,
    updatePaymentGateway, supabase, updateSupabase, adminPassword, setAdminPassword,
    appColors, updateAppColors, popup, updatePopup, contactInfo, updateContactInfo,
    orders
  } = useAdminStore();

  useEffect(() => {
    const checkSecretUrl = () => {
      if (window.location.hash === ADMIN_SECRET_PATH) {
        setIsVisible(true);
        if (!isAuthenticated) setShowLogin(true);
      }
    };
    checkSecretUrl();
    window.addEventListener('hashchange', checkSecretUrl);
    return () => window.removeEventListener('hashchange', checkSecretUrl);
  }, [isAuthenticated]);

  const closeAdminPanel = () => {
    setIsVisible(false);
    setShowLogin(false);
    history.pushState('', document.title, window.location.pathname + window.location.search);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setShowLogin(false);
      setPassword('');
      setLoginError('');
    } else {
      setLoginError('Incorrect password');
    }
  };

  const handleLogout = () => { logout(); closeAdminPanel(); };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const handleTestSupabase = async () => {
    setTestingSupabase(true);
    const connected = await testSupabaseConnection(supabase.url, supabase.anonKey);
    updateSupabase({ connected });
    if (connected) initSupabase(supabase.url, supabase.anonKey);
    setTestingSupabase(false);
  };

  const toggleSecret = (key: string) => {
    setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownloadRevenueReport = () => {
    if (!dateRange.from || !dateRange.to) {
      alert('Please select date range');
      return;
    }
    generateRevenueReportPDF(orders as any, dateRange);
  };

  const handleDownloadProductCatalog = () => {
    generateProductCatalogPDF(products);
  };

  if (!isVisible) return null;

  if (showLogin && !isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center">
              <KeyRound className="text-white" size={24} />
            </div>
            <div>
              <h2 className="font-bold text-lg">Admin Access</h2>
              <p className="text-sm text-gray-500">Enter password to continue</p>
            </div>
          </div>
          <form onSubmit={handleLogin}>
            <div className="relative mb-3">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password" className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-violet-300" autoFocus />
            </div>
            {loginError && <p className="text-red-500 text-sm mb-3 flex items-center gap-1"><AlertCircle size={14} /> {loginError}</p>}
            <div className="flex gap-2">
              <button type="button" onClick={closeAdminPanel} className="flex-1 px-4 py-2.5 border rounded-xl hover:bg-gray-50">Cancel</button>
              <button type="submit" className="flex-1 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white rounded-xl hover:opacity-90 font-medium">Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const tabs: { id: Tab; label: string; icon: React.ReactNode; color?: string }[] = [
    { id: 'chatbot', label: 'Chatbot', icon: <Bot size={18} /> },
    { id: 'payment', label: 'Payments', icon: <CreditCard size={18} /> },
    { id: 'supabase', label: 'Database', icon: <Database size={18} /> },
    { id: 'colors', label: 'Branding', icon: <Palette size={18} />, color: 'text-pink-600' },
    { id: 'popup', label: 'Popup', icon: <Megaphone size={18} />, color: 'text-amber-600' },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} />, color: 'text-blue-600' },
    { id: 'reports', label: 'Reports', icon: <FileText size={18} />, color: 'text-green-600' },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Settings size={20} />
            </div>
            <div>
              <h2 className="font-bold">ShopNova Admin</h2>
              <p className="text-xs text-gray-400">Complete Control Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {saveStatus === 'saving' && <span className="text-sm flex items-center gap-1 text-amber-400"><Loader2 size={14} className="animate-spin" /> Saving...</span>}
            {saveStatus === 'saved' && <span className="text-sm flex items-center gap-1 text-green-400"><Check size={14} /> Saved!</span>}
            <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1 text-sm">
              <LogOut size={16} /><span className="hidden sm:inline">Logout</span>
            </button>
            <button onClick={closeAdminPanel} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X size={18} /></button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 bg-gray-50 border-r p-2 flex flex-col gap-1 overflow-y-auto">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === tab.id ? 'bg-violet-100 text-violet-700' : 'text-gray-600 hover:bg-gray-100'
                }`}>
                <span className={tab.color}>{tab.icon}</span>
                {tab.label}
                <ChevronRight size={14} className={`ml-auto transition-transform ${activeTab === tab.id ? 'rotate-90' : ''}`} />
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Chatbot */}
            {activeTab === 'chatbot' && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Chatbot Settings</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div><p className="font-medium">Enable Chatbot</p><p className="text-sm text-gray-500">Show chat widget</p></div>
                  <button onClick={() => updateChatbot({ enabled: !chatbot.enabled })} className={chatbot.enabled ? 'text-green-600' : 'text-gray-400'}>
                    {chatbot.enabled ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div><p className="font-medium">Use AI API</p><p className="text-sm text-gray-500">{chatbot.useApi ? 'AI Mode' : 'Basic Mode'}</p></div>
                  <button onClick={() => updateChatbot({ useApi: !chatbot.useApi })} className={chatbot.useApi ? 'text-violet-600' : 'text-gray-400'}>
                    {chatbot.useApi ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                  </button>
                </div>
                {chatbot.useApi && (
                  <div className="space-y-3 p-4 border rounded-xl">
                    <div>
                      <label className="block text-sm font-medium mb-1">API Provider</label>
                      <select value={chatbot.apiProvider} onChange={(e) => updateChatbot({ apiProvider: e.target.value as any })} className="w-full px-3 py-2 border rounded-lg">
                        <option value="openai">OpenAI</option>
                        <option value="gemini">Google Gemini</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">API Key</label>
                      <div className="relative">
                        <input type={showSecrets['chatbot-api'] ? 'text' : 'password'} value={chatbot.apiKey} onChange={(e) => updateChatbot({ apiKey: e.target.value })} className="w-full px-3 py-2 pr-10 border rounded-lg" />
                        <button type="button" onClick={() => toggleSecret('chatbot-api')} className="absolute right-2 top-1/2 text-gray-400">{showSecrets['chatbot-api'] ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                      </div>
                    </div>
                  </div>
                )}
                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"><Save size={16} /> Save Changes</button>
              </div>
            )}

            {/* Payments */}
            {activeTab === 'payment' && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Payment Gateways</h3>
                {paymentGateways.map((gateway) => (
                  <PaymentGatewayCard key={gateway.id} gateway={gateway} onUpdate={(config) => updatePaymentGateway(gateway.id, config)} showSecrets={showSecrets} toggleSecret={toggleSecret} />
                ))}
                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"><Save size={16} /> Save Changes</button>
              </div>
            )}

            {/* Supabase */}
            {activeTab === 'supabase' && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Supabase Database</h3>
                <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                  <span className="font-medium">Connection Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${supabase.connected ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>{supabase.connected ? '✓ Connected' : 'Not Connected'}</span>
                </div>
                <div className="space-y-3">
                  <input type="text" value={supabase.url} onChange={(e) => updateSupabase({ url: e.target.value })} placeholder="Supabase URL" className="w-full px-3 py-2 border rounded-lg" />
                  <div className="relative">
                    <input type={showSecrets['supabase-key'] ? 'text' : 'password'} value={supabase.anonKey} onChange={(e) => updateSupabase({ anonKey: e.target.value })} placeholder="Anon Key" className="w-full px-3 py-2 pr-10 border rounded-lg" />
                    <button type="button" onClick={() => toggleSecret('supabase-key')} className="absolute right-2 top-1/2 text-gray-400">{showSecrets['supabase-key'] ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                  </div>
                  <button onClick={handleTestSupabase} disabled={testingSupabase} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg disabled:opacity-50">
                    {testingSupabase ? <Loader2 size={16} className="animate-spin" /> : <Database size={16} />} Test Connection
                  </button>
                </div>
              </div>
            )}

            {/* Branding Colors */}
            {activeTab === 'colors' && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2"><Palette className="text-pink-600" /> App Branding</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Primary Color</label>
                    <div className="flex gap-2">
                      <input type="color" value={appColors.primary} onChange={(e) => updateAppColors({ primary: e.target.value })} className="w-12 h-10 rounded border" />
                      <input type="text" value={appColors.primary} onChange={(e) => updateAppColors({ primary: e.target.value })} className="flex-1 px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Secondary Color</label>
                    <div className="flex gap-2">
                      <input type="color" value={appColors.secondary} onChange={(e) => updateAppColors({ secondary: e.target.value })} className="w-12 h-10 rounded border" />
                      <input type="text" value={appColors.secondary} onChange={(e) => updateAppColors({ secondary: e.target.value })} className="flex-1 px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Accent Color</label>
                    <div className="flex gap-2">
                      <input type="color" value={appColors.accent} onChange={(e) => updateAppColors({ accent: e.target.value })} className="w-12 h-10 rounded border" />
                      <input type="text" value={appColors.accent} onChange={(e) => updateAppColors({ accent: e.target.value })} className="flex-1 px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Gradient</label>
                    <select value={appColors.gradient} onChange={(e) => updateAppColors({ gradient: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                      <option value="from-violet-600 to-fuchsia-500">Violet → Fuchsia</option>
                      <option value="from-blue-600 to-cyan-500">Blue → Cyan</option>
                      <option value="from-pink-600 to-rose-500">Pink → Rose</option>
                      <option value="from-emerald-600 to-teal-500">Emerald → Teal</option>
                      <option value="from-amber-600 to-orange-500">Amber → Orange</option>
                    </select>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-xl text-white text-center">
                  <p className="font-bold">Preview</p>
                  <button className="mt-2 px-6 py-2 bg-white text-gray-900 rounded-full font-medium">Button Preview</button>
                </div>
                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"><Save size={16} /> Save Changes</button>
              </div>
            )}

            {/* Popup Settings */}
            {activeTab === 'popup' && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2"><Megaphone className="text-amber-600" /> Promotional Popup</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div><p className="font-medium">Enable Popup</p><p className="text-sm text-gray-500">Show on website load</p></div>
                  <button onClick={() => updatePopup({ enabled: !popup.enabled })} className={popup.enabled ? 'text-green-600' : 'text-gray-400'}>
                    {popup.enabled ? <ToggleRight size={40} /> : <ToggleLeft size={40} />}
                  </button>
                </div>
                <div className="space-y-3">
                  <input type="text" value={popup.title} onChange={(e) => updatePopup({ title: e.target.value })} placeholder="Popup Title" className="w-full px-3 py-2 border rounded-lg" />
                  <textarea value={popup.message} onChange={(e) => updatePopup({ message: e.target.value })} placeholder="Message" rows={3} className="w-full px-3 py-2 border rounded-lg resize-none" />
                  <input type="text" value={popup.buttonText} onChange={(e) => updatePopup({ buttonText: e.target.value })} placeholder="Button Text" className="w-full px-3 py-2 border rounded-lg" />
                  <input type="text" value={popup.buttonLink} onChange={(e) => updatePopup({ buttonLink: e.target.value })} placeholder="Button Link (optional)" className="w-full px-3 py-2 border rounded-lg" />
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={popup.showOnLoad} onChange={(e) => updatePopup({ showOnLoad: e.target.checked })} /> Show on Load</label>
                    <label className="flex items-center gap-2 text-sm">Delay: <input type="number" value={popup.delaySeconds} onChange={(e) => updatePopup({ delaySeconds: Number(e.target.value) })} className="w-16 px-2 py-1 border rounded" /> sec</label>
                  </div>
                  <select value={popup.backgroundColor} onChange={(e) => updatePopup({ backgroundColor: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                    <option value="from-violet-600 via-fuchsia-600 to-pink-500">Violet → Pink</option>
                    <option value="from-blue-600 via-cyan-600 to-teal-500">Blue → Teal</option>
                    <option value="from-amber-500 via-orange-500 to-red-500">Orange → Red</option>
                    <option value="from-emerald-500 via-green-500 to-teal-500">Green → Teal</option>
                  </select>
                </div>
                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"><Save size={16} /> Save Changes</button>
              </div>
            )}

            {/* Contact Info */}
            {activeTab === 'contact' && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2"><Mail className="text-blue-600" /> Contact Information</h3>
                <div className="space-y-3">
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 text-gray-400" />
                    <input type="email" value={contactInfo.email} onChange={(e) => updateContactInfo({ email: e.target.value })} className="w-full pl-10 px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 text-gray-400" />
                    <input type="tel" value={contactInfo.whatsapp} onChange={(e) => updateContactInfo({ whatsapp: e.target.value })} className="w-full pl-10 px-3 py-2 border rounded-lg" />
                  </div>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 text-gray-400" />
                    <input type="text" value={contactInfo.address} onChange={(e) => updateContactInfo({ address: e.target.value })} className="w-full pl-10 px-3 py-2 border rounded-lg" />
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-800 font-medium">Current Contact Info:</p>
                  <p className="text-xs text-blue-700 mt-1">{contactInfo.email}</p>
                  <p className="text-xs text-blue-700">+91 {contactInfo.whatsapp}</p>
                  <p className="text-xs text-blue-700">{contactInfo.address}</p>
                </div>
                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"><Save size={16} /> Save Changes</button>
              </div>
            )}

            {/* Reports */}
            {activeTab === 'reports' && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg flex items-center gap-2"><FileText className="text-green-600" /> Reports & Analytics</h3>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-4 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl text-white">
                    <ShoppingCart size={24} className="mb-2" />
                    <p className="text-2xl font-bold">{orders.length}</p>
                    <p className="text-xs opacity-80">Total Orders</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white">
                    <TrendingUp size={24} className="mb-2" />
                    <p className="text-2xl font-bold">₹{orders.reduce((s, o) => s + o.total, 0).toLocaleString()}</p>
                    <p className="text-xs opacity-80">Total Revenue</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
                    <Users size={24} className="mb-2" />
                    <p className="text-2xl font-bold">{new Set(orders.map(o => o.user_email)).size}</p>
                    <p className="text-xs opacity-80">Customers</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl text-white">
                    <MessageCircle size={24} className="mb-2" />
                    <p className="text-2xl font-bold">{chatbot.enabled ? 'Active' : 'Inactive'}</p>
                    <p className="text-xs opacity-80">Chatbot</p>
                  </div>
                </div>

                {/* Date Range */}
                <div className="p-4 border rounded-xl space-y-3">
                  <h4 className="font-medium">Generate Revenue Report</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="date" value={dateRange.from} onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })} className="px-3 py-2 border rounded-lg" />
                    <input type="date" value={dateRange.to} onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })} className="px-3 py-2 border rounded-lg" />
                  </div>
                  <button onClick={handleDownloadRevenueReport} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    <Download size={16} /> Download Revenue Report (PDF)
                  </button>
                </div>

                {/* Product Catalog */}
                <div className="p-4 border rounded-xl">
                  <h4 className="font-medium mb-3">Product Catalog</h4>
                  <button onClick={handleDownloadProductCatalog} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Download size={16} /> Download Product Catalog (PDF)
                  </button>
                  <p className="text-xs text-gray-500 mt-2">{products.length} products will be included</p>
                </div>

                {/* Order List */}
                {orders.length > 0 && (
                  <div className="p-4 border rounded-xl">
                    <h4 className="font-medium mb-3">Recent Orders</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                          <span>{order.user_name} - ₹{order.total}</span>
                          <span className={`px-2 py-0.5 rounded text-xs ${order.order_status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{order.order_status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Security Settings</h3>
                <div className="p-4 bg-violet-50 rounded-xl">
                  <h4 className="font-medium text-violet-800 mb-2 flex items-center gap-2"><KeyRound size={16} /> Secret Admin URL</h4>
                  <code className="block bg-violet-100 px-3 py-2 rounded text-sm text-violet-900 font-mono">{window.location.origin}{ADMIN_SECRET_PATH}</code>
                  <p className="text-xs text-violet-600 mt-2">⚠️ Keep this URL private</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Change Password</label>
                  <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Payment Gateway Card
function PaymentGatewayCard({ gateway, onUpdate, showSecrets, toggleSecret }: { gateway: PaymentGateway; onUpdate: (c: Partial<PaymentGateway>) => void; showSecrets: Record<string, boolean>; toggleSecret: (k: string) => void }) {
  const [expanded, setExpanded] = useState(gateway.enabled);
  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${gateway.enabled ? 'bg-green-100' : 'bg-gray-200'}`}>
            <CreditCard size={20} className={gateway.enabled ? 'text-green-600' : 'text-gray-500'} />
          </div>
          <div>
            <p className="font-medium">{gateway.name}</p>
            <p className="text-xs text-gray-500">{gateway.enabled ? 'Enabled' : 'Disabled'}{gateway.testMode && ' • Test'}</p>
          </div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onUpdate({ enabled: !gateway.enabled }); }} className={gateway.enabled ? 'text-green-600' : 'text-gray-400'}>
          {gateway.enabled ? <ToggleRight size={36} /> : <ToggleLeft size={36} />}
        </button>
      </div>
      {expanded && (
        <div className="p-4 space-y-3 border-t">
          <input type="text" value={gateway.keyId} onChange={(e) => onUpdate({ keyId: e.target.value })} placeholder="App ID / Key ID" className="w-full px-3 py-2 border rounded-lg" />
          <div className="relative">
            <input type={showSecrets[`${gateway.id}-secret`] ? 'text' : 'password'} value={gateway.keySecret} onChange={(e) => onUpdate({ keySecret: e.target.value })} placeholder="Secret Key" className="w-full px-3 py-2 pr-10 border rounded-lg" />
            <button type="button" onClick={() => toggleSecret(`${gateway.id}-secret`)} className="absolute right-2 top-1/2 text-gray-400">{showSecrets[`${gateway.id}-secret`] ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={gateway.testMode} onChange={(e) => onUpdate({ testMode: e.target.checked })} /> Test Mode</label>
        </div>
      )}
    </div>
  );
}

function Settings({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
}
