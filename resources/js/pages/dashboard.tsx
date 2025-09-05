import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Calendar, Bell, Settings, User2, Mail, Send, MessageSquare, PencilLine, AlertTriangle, CheckCircle2, TrendingUp, Shield } from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

// --- Mock data (replace with API data from Laravel later) ---
const user = {
  name: "Іван",
  profile: {
    type: "ФОП",
    group: "2 група",
    system: "Спрощена",
    edrpou: "1234567890",
    vat: false,
    period: "Квартал",
    completeness: 80,
    updatedAt: "05.09.2025",
  },
};

const events = {
  next: { title: "Єдиний податок", due: "10.09", status: "Очікує" },
  upcoming: [
    { date: "15.09", title: "ЄСВ" },
    { date: "20.09", title: "ПДВ" },
    { date: "30.09", title: "Декларація" },
  ],
};

const stats = [
  { name: "Виконано", value: 3 },
  { name: "Очікує", value: 2 },
  { name: "Прострочено", value: 1 },
];

const taxLimits = {
  label: "Ліміт для групи 2",
  limit: 8000000,
  used: 6200000,
};

const integrations = [
  { key: "email", label: "Email", icon: Mail, status: "active" },
  { key: "telegram", label: "Telegram", icon: Send, status: "active" },
  { key: "viber", label: "Viber", icon: MessageSquare, status: "inactive" },
];

const COLORS = ["#22c55e", "#eab308", "#ef4444"]; // ok in mockup

function SectionTitle({ icon: Icon, children, action }: { icon: any; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground">{children}</h3>
      </div>
      {action}
    </div>
  );
}

function BadgePill({ children, tone = "default" as "default" | "success" | "warn" | "danger" }: { children: React.ReactNode; tone?: "default" | "success" | "warn" | "danger" }) {
  const toneClass =
    tone === "success"
      ? "bg-emerald-100 text-emerald-700"
      : tone === "warn"
      ? "bg-amber-100 text-amber-700"
      : tone === "danger"
      ? "bg-red-100 text-red-700"
      : "bg-muted text-muted-foreground";
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${toneClass}`}>{children}</span>;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  const limitPct = Math.min(100, Math.round((taxLimits.used / taxLimits.limit) * 100));
  const pieTotal = stats.reduce((a, b) => a + b.value, 0);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="space-y-6">
        {/* Top: Greeting + Tax Profile */}
        <Card className="shadow-sm">
          <CardContent className="p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <motion.h1 initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="text-xl md:text-2xl font-semibold">
                  👋 Вітаємо, {user.name}!
                </motion.h1>
                <p className="text-sm text-muted-foreground">Ваші податкові налаштування актуальні станом на {user.profile.updatedAt}.</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <BadgePill tone="success">{user.profile.type}</BadgePill>
                  <BadgePill tone="success">{user.profile.group}</BadgePill>
                  <BadgePill>{user.profile.system}</BadgePill>
                  <BadgePill>ЄДРПОУ/ІПН: {user.profile.edrpou}</BadgePill>
                  <BadgePill tone={user.profile.vat ? "success" : "warn"}>{user.profile.vat ? "З ПДВ" : "Без ПДВ"}</BadgePill>
                  <BadgePill>Звітність: {user.profile.period}</BadgePill>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div className="w-44">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Профіль заповнено</span>
                      <span>{user.profile.completeness}%</span>
                    </div>
                    <Progress value={user.profile.completeness} className="h-2" />
                    <div className="flex justify-end mt-2">
                      <Button size="sm" variant="secondary" className="rounded-2xl"><PencilLine className="h-4 w-4 mr-1"/>Редагувати</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Middle grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tax Limits */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3"><CardTitle className="text-base">📊 Податкові ліміти</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">{taxLimits.label}</div>
              <div className="text-2xl font-semibold">
                {(taxLimits.used / 1_000_000).toFixed(1)} млн / {(taxLimits.limit / 1_000_000).toFixed(0)} млн грн
              </div>
              <Progress value={limitPct} className="h-2" />
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  {limitPct >= 90 ? (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  )}
                  <span>Використано: {limitPct}%</span>
                </div>
                <Button size="sm" variant="outline" className="rounded-2xl">Детальніше</Button>
              </div>
            </CardContent>
          </Card>

          {/* Next Event */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3"><CardTitle className="text-base">⏳ Найближча подія</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">{events.next.title}</div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">Дедлайн: {events.next.due}</div>
                <BadgePill tone={events.next.status === "Очікує" ? "warn" : "success"}>{events.next.status}</BadgePill>
              </div>
              <div className="flex items-center gap-2">
                <Button className="rounded-2xl"><CheckCircle2 className="h-4 w-4 mr-1"/>Відзначити як сплачено</Button>
                <Button variant="outline" className="rounded-2xl"><Calendar className="h-4 w-4 mr-1"/>Календар</Button>
              </div>
            </CardContent>
          </Card>

          {/* Pie Stats */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3"><CardTitle className="text-base">📈 Статистика подій</CardTitle></CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={stats} dataKey="value" nameKey="name" innerRadius={50} outerRadius={75} paddingAngle={4}>
                    {stats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(v: any, n: any) => [`${v}`, n]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 text-xs text-muted-foreground mt-2">
                {stats.map((s, i) => (
                  <div key={s.name} className="flex items-center gap-1">
                    <span className="inline-block h-2 w-2 rounded" style={{ background: COLORS[i] }} />
                    {s.name}: {s.value}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lower grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3"><CardTitle className="text-base">🔔 Наступні події</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {events.upcoming.map((e) => (
                  <div key={e.title + e.date} className="flex items-center justify-between rounded-2xl border p-3">
                    <div>
                      <div className="text-sm text-muted-foreground">{e.title}</div>
                      <div className="text-lg font-semibold">{e.date}</div>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-2xl">Деталі</Button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="ghost" className="rounded-2xl">Переглянути всі</Button>
              </div>
            </CardContent>
          </Card>

          {/* Integrations */}
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">📡 Інтеграції / Канали</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {integrations.map(({ key, label, icon: Icon, status }) => (
                  <div key={key} className="flex items-center justify-between rounded-2xl border p-3">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <div className="text-sm font-medium">{label}</div>
                    </div>
                    {status === "active" ? (
                      <BadgePill tone="success">Активний</BadgePill>
                    ) : (
                      <BadgePill tone="warn">Не підключено</BadgePill>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button className="rounded-2xl">Налаштувати канали</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom: News + Quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3"><CardTitle className="text-base">📰 Новини / Зміни</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {["Новий закон про ПДВ", "Зміни для ФОП 2 групи", "Оновлені ставки ЄСВ"].map((n) => (
                <div key={n} className="flex items-center justify-between rounded-2xl border p-3">
                  <div className="text-sm font-medium">{n}</div>
                  <Button variant="outline" size="sm" className="rounded-2xl">Читати</Button>
                </div>
              ))}
              <div className="flex justify-end">
                <Button variant="ghost" className="rounded-2xl">Усі новини</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">⚡ Швидкі дії</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="secondary" className="rounded-2xl justify-start"><Calendar className="h-4 w-4 mr-2"/>Календар</Button>
              <Button variant="secondary" className="rounded-2xl justify-start"><User2 className="h-4 w-4 mr-2"/>Профіль</Button>
              <Button variant="secondary" className="rounded-2xl justify-start"><Bell className="h-4 w-4 mr-2"/>Сповіщення</Button>
              <Button variant="secondary" className="rounded-2xl justify-start"><Settings className="h-4 w-4 mr-2"/>Налаштування</Button>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </AppLayout>
  );
}