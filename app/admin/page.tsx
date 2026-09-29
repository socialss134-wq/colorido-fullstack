"use client";

import { useEffect, useState } from "react";
import { adminLogin, clearAdminToken, getAdminDashboard, getAdminRegistrations, getAdminToken, updateAdminRegistrationStatus, downloadAdminRegistrations } from "@/lib/api/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function AdminPage() {
  const [loggedIn,setLoggedIn]=useState(false);
  const [email,setEmail]=useState("admin@colorido.local");
  const [password,setPassword]=useState("");
  const [loginError,setLoginError]=useState("");
  const [dashboard,setDashboard]=useState<any>(null);
  const [registrations,setRegistrations]=useState<any[]>([]);
  const [loading,setLoading]=useState(false);

  const load=async()=>{
    setLoading(true);
    try {
      const [d,r]=await Promise.all([getAdminDashboard(),getAdminRegistrations()]);
      setDashboard(d); setRegistrations(r); setLoggedIn(true);
    } catch { clearAdminToken(); setLoggedIn(false); }
    finally { setLoading(false); }
  };
  useEffect(()=>{ if(getAdminToken()) load(); },[]);

  async function login(e:React.FormEvent){
    e.preventDefault(); setLoginError("");
    try { await adminLogin(email,password); await load(); }
    catch(err:any){ setLoginError(err.message || "Login failed"); }
  }
  async function status(id:string,status:string){
    await updateAdminRegistrationStatus(id,status);
    setRegistrations(await getAdminRegistrations());
  }
  if(!loggedIn) return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Card className="p-6">
        <h1 className="font-display text-2xl font-bold mb-2">COLORIDO Admin</h1>
        <p className="text-sm text-muted-foreground mb-6">Manage registrations and monitor the fest database.</p>
        <form onSubmit={login} className="space-y-4">
          <Input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Admin email"/>
          <Input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password"/>
          {loginError && <p className="text-sm text-destructive">{loginError}</p>}
          <Button className="w-full" disabled={loading}>Sign in</Button>
        </form>
      </Card>
    </div>
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div><h1 className="font-display text-3xl font-bold">Admin Dashboard</h1><p className="text-muted-foreground">COLORIDO 2K26 database</p></div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={()=>{clearAdminToken();setLoggedIn(false)}}>Sign out</Button>
          <Button onClick={async()=>{const blob=await downloadAdminRegistrations();const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="colorido-registrations.csv";a.click();URL.revokeObjectURL(url)}}>Export CSV</Button>
        </div>
      </div>
      {dashboard && <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mb-8">
        {Object.entries(dashboard).map(([k,v])=><Card key={k} className="p-4"><div className="text-2xl font-bold">{String(v)}</div><div className="text-xs text-muted-foreground capitalize">{k.replace(/([A-Z])/g," $1")}</div></Card>)}
      </div>}
      <Card className="p-4 overflow-x-auto">
        <h2 className="font-display text-xl font-bold mb-4">Registrations</h2>
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left"><th className="p-2">ID</th><th className="p-2">Participant</th><th className="p-2">College</th><th className="p-2">Event</th><th className="p-2">Status</th><th className="p-2">Action</th></tr></thead>
          <tbody>{registrations.map(r=><tr key={r.id} className="border-b">
            <td className="p-2 font-mono">{r.registrationId}</td><td className="p-2">{r.participant.participantName}<br/><span className="text-xs text-muted-foreground">{r.participant.email}</span></td>
            <td className="p-2">{r.participant.college}</td><td className="p-2">{r.event.name}</td><td className="p-2">{r.status}</td>
            <td className="p-2"><select className="rounded border bg-background px-2 py-1" value={r.status} onChange={e=>status(r.id,e.target.value)}><option value="confirmed">confirmed</option><option value="pending">pending</option><option value="cancelled">cancelled</option></select></td>
          </tr>)}</tbody>
        </table>
        {registrations.length===0 && <p className="py-8 text-center text-muted-foreground">No registrations yet.</p>}
      </Card>
    </div>
  );
}
