import { useState } from 'react';
import { Camera, MapPin, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

type ReportStatus = 'pending' | 'inProgress' | 'resolved' | 'rejected';
type ReportCategory = 'garbage' | 'water' | 'lighting' | 'trees' | 'roads' | 'other';

interface EcoReport {
  id: number;
  title: string;
  category: ReportCategory;
  address: string;
  status: ReportStatus;
  date: string;
  description: string;
}

const Ecology = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ReportCategory | 'all'>('all');

  const reports: EcoReport[] = [
    {
      id: 1,
      title: 'Қоқыс контейнері толы',
      category: 'garbage',
      address: '15-ші шағын аудан',
      status: 'inProgress',
      date: '2025-11-08',
      description: 'Қоқыс контейнері 3 күн бойы босатылмады',
    },
    {
      id: 2,
      title: 'Жол жарығы жанбайды',
      category: 'lighting',
      address: '28-ші шағын аудан',
      status: 'resolved',
      date: '2025-11-05',
      description: 'Көше бойындағы 5 жарық бағанасы істемейді',
    },
    {
      id: 3,
      title: 'Су ағып жатыр',
      category: 'water',
      address: 'Микрорайон 7',
      status: 'pending',
      date: '2025-11-09',
      description: 'Су құбыры жарылған, су жолға ағып жатыр',
    },
  ];

  const filteredReports = selectedCategory === 'all' 
    ? reports 
    : reports.filter((r) => r.category === selectedCategory);

  const getStatusIcon = (status: ReportStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'inProgress':
        return <AlertCircle className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-muted text-muted-foreground';
      case 'inProgress':
        return 'bg-warning text-warning-foreground';
      case 'resolved':
        return 'bg-eco text-eco-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
    }
  };

  const getCategoryColor = (category: ReportCategory) => {
    const colors = {
      garbage: 'bg-orange-500',
      water: 'bg-blue-500',
      lighting: 'bg-yellow-500',
      trees: 'bg-green-500',
      roads: 'bg-gray-500',
      other: 'bg-purple-500',
    };
    return colors[category];
  };

  const categories: ReportCategory[] = ['garbage', 'water', 'lighting', 'trees', 'roads', 'other'];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-eco to-green-400 bg-clip-text text-transparent">
            {t.ecology.title}
          </h1>
          <p className="text-xl text-muted-foreground">{t.ecology.subtitle}</p>
        </div>

        {/* Report Problem Button */}
        <div className="flex justify-center">
          <Button size="lg" className="gap-2 bg-gradient-to-r from-eco to-green-400 hover:opacity-90 shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <Camera className="w-5 h-5" />
            {t.ecology.reportProblem}
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
          >
            Все категории
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(cat)}
              className="gap-2"
            >
              <div className={`w-3 h-3 rounded-full ${getCategoryColor(cat)}`} />
              {t.ecology.categories[cat]}
            </Button>
          ))}
        </div>

        {/* Eco Map */}
        <Card className="overflow-hidden border-2">
          <div className="relative h-[400px] bg-gradient-to-br from-eco/20 via-green-400/20 to-secondary flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="w-16 h-16 mx-auto text-eco animate-float" />
              <p className="text-xl font-semibold text-foreground">Экологическая карта города</p>
              <p className="text-muted-foreground max-w-md mx-auto">
                Тепловая карта показывает проблемные зоны города
              </p>
            </div>
          </div>
        </Card>

        {/* Reports Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">{t.ecology.myReports}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getCategoryColor(report.category) + ' text-white'}>
                      {t.ecology.categories[report.category]}
                    </Badge>
                    <Badge className={getStatusColor(report.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(report.status)}
                        {t.ecology.status[report.status]}
                      </div>
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{report.title}</CardTitle>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {report.address}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(report.date).toLocaleDateString('ru-RU')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-eco">127</CardTitle>
              <CardDescription>Всего обращений</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-warning">42</CardTitle>
              <CardDescription>В работе</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-eco">78</CardTitle>
              <CardDescription>Решено</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">92%</CardTitle>
              <CardDescription>Эффективность</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Ecology;
