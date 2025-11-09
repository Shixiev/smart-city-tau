import { User, Award, FileText, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

const Profile = () => {
  const { t } = useLanguage();

  const user = {
    name: 'Даулет Әбдіқадыр',
    district: '15-ші шағын аудан',
    rating: 750,
    maxRating: 1000,
    reportsCount: 12,
    eventsCount: 5,
    achievementsCount: 8,
  };

  const achievements = [
    { id: 1, title: 'Эко-активист', description: '10 обращений по экологии', icon: '🌿' },
    { id: 2, title: 'Новатор', description: '5 предложенных событий', icon: '💡' },
    { id: 3, title: 'Городской герой', description: 'Высокий рейтинг участия', icon: '⭐' },
  ];

  const recentActivity = [
    { id: 1, type: 'report', text: 'Сообщил о проблеме с освещением', date: '2025-11-08' },
    { id: 2, type: 'event', text: 'Предложил событие "Чистый пляж"', date: '2025-11-05' },
    { id: 3, type: 'achievement', text: 'Получил значок "Эко-активист"', date: '2025-11-03' },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-eco flex items-center justify-center shadow-lg">
            <User className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <p className="text-xl text-muted-foreground">{user.district}</p>
        </div>

        {/* City Rating */}
        <Card className="max-w-2xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-eco/5">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              {t.profile.cityRating}
            </CardTitle>
            <CardDescription>Ваш вклад в развитие города</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Уровень участия</span>
                <span className="font-semibold">{user.rating} / {user.maxRating}</span>
              </div>
              <Progress value={(user.rating / user.maxRating) * 100} className="h-3" />
            </div>
            <p className="text-sm text-muted-foreground">
              Продолжайте участвовать в жизни города, чтобы повысить свой рейтинг!
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card className="text-center hover:shadow-md transition-shadow">
            <CardHeader>
              <FileText className="w-8 h-8 mx-auto text-eco mb-2" />
              <CardTitle className="text-3xl font-bold">{user.reportsCount}</CardTitle>
              <CardDescription>{t.profile.myReports}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center hover:shadow-md transition-shadow">
            <CardHeader>
              <Calendar className="w-8 h-8 mx-auto text-primary mb-2" />
              <CardTitle className="text-3xl font-bold">{user.eventsCount}</CardTitle>
              <CardDescription>{t.profile.myEvents}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center hover:shadow-md transition-shadow">
            <CardHeader>
              <Award className="w-8 h-8 mx-auto text-warning mb-2" />
              <CardTitle className="text-3xl font-bold">{user.achievementsCount}</CardTitle>
              <CardDescription>{t.profile.achievements}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Achievements */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{t.profile.achievements}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
                <CardHeader>
                  <div className="text-5xl mb-3">{achievement.icon}</div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Недавняя активность</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div>
                      <p className="font-medium">{activity.text}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="flex justify-center">
          <Button variant="outline" size="lg" className="gap-2">
            {t.profile.logout}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
