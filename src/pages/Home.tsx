import { Link } from 'react-router-dom';
import { MapPin, Leaf, Bell, MessageCircle, TrendingUp, Droplets, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const Home = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: MapPin,
      title: t.map.title,
      description: t.map.subtitle,
      link: '/map',
      gradient: 'from-primary to-primary-light',
    },
    {
      icon: Leaf,
      title: t.ecology.title,
      description: t.ecology.subtitle,
      link: '/ecology',
      gradient: 'from-eco to-green-400',
    },
    {
      icon: Bell,
      title: t.alert.title,
      description: t.alert.subtitle,
      link: '/alerts',
      gradient: 'from-warning to-orange-400',
    },
  ];

  const ecoStats = [
    { label: 'Качество воздуха', value: 'Хорошее', icon: Wind, color: 'text-eco' },
    { label: 'Температура воды', value: '+23°C', icon: Droplets, color: 'text-primary' },
    { label: 'Активность горожан', value: '+15%', icon: TrendingUp, color: 'text-warning' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-eco/10 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block animate-float">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-eco flex items-center justify-center shadow-lg">
                <MapPin className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-eco to-primary bg-clip-text text-transparent animate-fade-in">
              {t.hero.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              {t.hero.subtitle}
            </p>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in">
              {t.hero.description}
            </p>

            <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
              <Link to="/map">
                <Button size="lg" className="gap-2 shadow-md hover:shadow-lg transition-all">
                  <MapPin className="w-5 h-5" />
                  {t.hero.openMap}
                </Button>
              </Link>
              <Link to="/ecology">
                <Button size="lg" variant="outline" className="gap-2 border-2 hover:bg-eco hover:text-eco-foreground hover:border-eco transition-all">
                  <Leaf className="w-5 h-5" />
                  {t.hero.reportProblem}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <Link key={idx} to={feature.link} className="group">
              <Card className="h-full border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    {t.map.details} →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Eco Stats Section */}
      <section className="py-20 bg-gradient-to-br from-secondary to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Экологические показатели
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {ecoStats.map((stat, idx) => (
              <Card key={idx} className="text-center hover:shadow-md transition-shadow">
                <CardHeader>
                  <stat.icon className={`w-12 h-12 mx-auto mb-2 ${stat.color}`} />
                  <CardTitle className="text-lg">{stat.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <Card className="bg-gradient-to-br from-primary/10 to-eco/10 border-2 border-primary/20">
          <CardHeader className="text-center space-y-4 pb-8">
            <MessageCircle className="w-16 h-16 mx-auto text-primary animate-pulse-glow" />
            <CardTitle className="text-3xl">{t.ai.title}</CardTitle>
            <CardDescription className="text-lg max-w-2xl mx-auto">
              {t.ai.greeting}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-eco hover:opacity-90">
              <MessageCircle className="w-5 h-5" />
              {t.hero.openAI}
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;
