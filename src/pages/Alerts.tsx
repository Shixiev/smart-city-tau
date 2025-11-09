import { useState } from 'react';
import { Bell, AlertTriangle, Newspaper, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

type AlertType = 'news' | 'warning' | 'event';

interface Alert {
  id: number;
  type: AlertType;
  title: string;
  description: string;
  date: string;
  isImportant: boolean;
  isRead: boolean;
}

const Alerts = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<AlertType | 'all'>('all');

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'warning',
      title: 'Жол жабылды',
      description: '28-ші шағын аудандағы жол учаскесі жөндеу жұмыстары үшін жабылды',
      date: '2025-11-09T10:00:00',
      isImportant: true,
      isRead: false,
    },
    {
      id: 2,
      type: 'news',
      title: 'Каспий температурасы',
      description: 'Бүгін су температурасы +23°C. Жүзуге өте қолайлы!',
      date: '2025-11-09T08:30:00',
      isImportant: false,
      isRead: false,
    },
    {
      id: 3,
      type: 'event',
      title: 'Қалалық субботник',
      description: 'Сенбіде қалалық субботник өтеді. Барлық тұрғындарды шақырамыз!',
      date: '2025-11-08T15:00:00',
      isImportant: true,
      isRead: true,
    },
  ]);

  const filteredAlerts = filter === 'all' ? alerts : alerts.filter((a) => a.type === filter);

  const getTypeIcon = (type: AlertType) => {
    switch (type) {
      case 'news':
        return <Newspaper className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'event':
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: AlertType) => {
    switch (type) {
      case 'news':
        return 'bg-primary text-primary-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'event':
        return 'bg-eco text-eco-foreground';
    }
  };

  const getTypeLabel = (type: AlertType) => {
    switch (type) {
      case 'news':
        return t.alert.filterNews;
      case 'warning':
        return t.alert.filterWarnings;
      case 'event':
        return t.alert.filterEvents;
    }
  };

  const toggleRead = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, isRead: !alert.isRead } : alert)));
  };

  const toggleImportant = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, isImportant: !alert.isImportant } : alert)));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Только что';
    if (diffInHours < 24) return `${diffInHours} ч. назад`;
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-warning to-orange-400 bg-clip-text text-transparent">
            {t.alert.title}
          </h1>
          <p className="text-xl text-muted-foreground">{t.alert.subtitle}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className="gap-2"
          >
            <Bell className="w-4 h-4" />
            {t.alert.filterAll}
          </Button>
          {(['news', 'warning', 'event'] as AlertType[]).map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'default' : 'outline'}
              onClick={() => setFilter(type)}
              className="gap-2"
            >
              {getTypeIcon(type)}
              {getTypeLabel(type)}
            </Button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={`transition-all duration-300 hover:shadow-lg border-2 ${
                !alert.isRead ? 'border-primary/50 bg-primary/5' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${getTypeColor(alert.type)}`}>
                      {getTypeIcon(alert.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className="text-xl">{alert.title}</CardTitle>
                        {alert.isImportant && (
                          <Star className="w-5 h-5 text-warning fill-warning" />
                        )}
                        {!alert.isRead && (
                          <Badge variant="secondary" className="text-xs">
                            Новое
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="text-base">{alert.description}</CardDescription>
                      <p className="text-sm text-muted-foreground">{formatDate(alert.date)}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleRead(alert.id)}
                  >
                    {alert.isRead ? 'Отметить непрочитанным' : t.alert.markRead}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleImportant(alert.id)}
                    className={alert.isImportant ? 'border-warning text-warning' : ''}
                  >
                    <Star className={`w-4 h-4 ${alert.isImportant ? 'fill-warning' : ''}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">
                {alerts.filter((a) => !a.isRead).length}
              </CardTitle>
              <CardDescription>Непрочитанных</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-warning">
                {alerts.filter((a) => a.isImportant).length}
              </CardTitle>
              <CardDescription>Важных</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-eco">
                {alerts.length}
              </CardTitle>
              <CardDescription>Всего</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
