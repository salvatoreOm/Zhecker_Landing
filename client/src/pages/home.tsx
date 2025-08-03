import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { 
  CheckCircle2, 
  Star, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  BookOpen, 
  Clock, 
  Target,
  Menu,
  X,
  DollarSign,
  ArrowRight,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { useCursor } from "@/hooks/use-cursor";
import { apiRequest } from "@/lib/queryClient";
import { insertSubscriptionSchema, type InsertSubscription } from "@shared/schema";
import ZheckerLogo from "@assets/image_1754239227889.png";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

function AnimatedSection({ children, className = "" }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const { toast } = useToast();
  
  // Initialize custom cursor
  useCursor();

  const form = useForm<InsertSubscription>({
    resolver: zodResolver(insertSubscriptionSchema),
    defaultValues: {
      instituteName: "",
      instituteType: "",
      contactPerson: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const subscriptionMutation = useMutation({
    mutationFn: async (data: InsertSubscription) => {
      const response = await apiRequest("POST", "/api/subscriptions", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscription Successful!",
        description: "Thank you for your interest. We'll contact you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertSubscription) => {
    subscriptionMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative"
              >
                <img 
                  src={ZheckerLogo} 
                  alt="Zhecker" 
                  className="w-12 h-12 rounded-xl neon-glow hover:neon-glow-lg transition-all duration-300 object-contain"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-cyan-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection("home")}
                className="hover:text-primary transition-colors duration-200 hover-lift"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection("features")}
                className="hover:text-primary transition-colors duration-200 hover-lift"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection("benefits")}
                className="hover:text-primary transition-colors duration-200 hover-lift"
              >
                Benefits
              </button>
              <button 
                onClick={() => setShowPricing(true)}
                className="hover:text-primary transition-colors duration-200 hover-lift"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection("subscribe")}
                className="hover:text-primary transition-colors duration-200 hover-lift"
              >
                Subscribe
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden border-t border-border bg-background/95 backdrop-blur-md"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button 
                  onClick={() => scrollToSection("home")}
                  className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors duration-200 w-full text-left"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection("features")}
                  className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors duration-200 w-full text-left"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection("benefits")}
                  className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors duration-200 w-full text-left"
                >
                  Benefits
                </button>
                <button 
                  onClick={() => setShowPricing(true)}
                  className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors duration-200 w-full text-left"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection("subscribe")}
                  className="block px-3 py-2 text-base font-medium hover:text-primary transition-colors duration-200 w-full text-left"
                >
                  Subscribe
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Floating Pricing Modal */}
      {showPricing && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowPricing(false)}
        >
          <motion.div
            className="pricing-card rounded-3xl p-8 max-w-md w-full pricing-float"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-cyan-500 rounded-2xl flex items-center justify-center mx-auto neon-glow">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-2">Pay-As-You-Go Pricing</h3>
                <p className="text-muted-foreground">
                  Flexible pricing that scales with your institution's needs
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-2xl">
                  <span className="text-sm">Per Answer Sheet</span>
                  <span className="font-bold text-primary">₹2.50</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-2xl">
                  <span className="text-sm">Bulk Evaluation (500+)</span>
                  <span className="font-bold text-primary">₹1.80</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-2xl">
                  <span className="text-sm">Enterprise (5000+)</span>
                  <span className="font-bold text-primary">₹1.20</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button 
                  onClick={() => {
                    setShowPricing(false);
                    scrollToSection("subscribe");
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold neon-glow hover:neon-glow-lg transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Us for Pricing
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowPricing(false)}
                  className="w-full border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
                >
                  Close
                </Button>
              </div>

              <div className="text-xs text-muted-foreground pt-2">
                * Custom pricing available for educational institutions with special requirements
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Animated Brand Text */}
      <div className="pt-16 pb-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg dark:dark-gradient-bg opacity-5"></div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-primary neon-text tracking-wider"
            animate={{ 
              textShadow: [
                "0 0 10px hsl(var(--neon-blue) / 0.8)",
                "0 0 20px hsl(var(--neon-blue) / 1), 0 0 30px hsl(var(--neon-cyan) / 0.8)",
                "0 0 10px hsl(var(--neon-blue) / 0.8)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {"Zhecker".split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="inline-block"
                whileHover={{ 
                  scale: 1.2, 
                  color: "hsl(var(--neon-cyan))",
                  textShadow: "0 0 25px hsl(var(--neon-cyan) / 1)"
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground mt-4 font-medium tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            AI-Powered Subjective Answer Evaluation
          </motion.p>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg dark:dark-gradient-bg opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                AI-Powered{" "}
                <span className="text-primary neon-text">Subjective</span>{" "}
                Answer Evaluation
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Revolutionize your educational assessment process with Zhecker's advanced AI technology. 
                Seamlessly evaluate subjective answers, save time, and provide consistent grading across your institution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold neon-glow hover:neon-glow-lg transition-all duration-300 transform hover:scale-105 hover-lift"
                  onClick={() => scrollToSection("subscribe")}
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold neon-border transition-all duration-300 hover-lift"
                >
                  Watch Demo
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <motion.div
                className="animate-float"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Modern classroom with digital assessment tools" 
                  className="rounded-2xl shadow-2xl w-full h-auto dark:neon-glow" 
                />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-xl neon-border"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center neon-glow">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">98% Accuracy</p>
                    <p className="text-sm text-muted-foreground">AI Evaluation</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Powerful <span className="text-primary neon-text">Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how Zhecker transforms traditional grading into an intelligent, efficient process
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle2,
                title: "AI-Powered Analysis",
                description: "Advanced machine learning algorithms analyze subjective answers with human-level accuracy and consistency."
              },
              {
                icon: Users,
                title: "Multi-Evaluator Support", 
                description: "Enable multiple educators to collaborate on evaluations with seamless workflow management."
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description: "Get instant insights into student performance trends and evaluation patterns with comprehensive dashboards."
              },
              {
                icon: Zap,
                title: "Seamless Integration",
                description: "Easily integrate with existing LMS platforms and educational tools your institution already uses."
              },
              {
                icon: Shield,
                title: "Secure & Compliant",
                description: "Enterprise-grade security with FERPA compliance ensuring student data protection and privacy."
              },
              {
                icon: BookOpen,
                title: "Custom Rubrics",
                description: "Create and customize evaluation rubrics that align with your institution's grading standards and criteria."
              }
            ].map((feature, index) => (
              <AnimatedSection key={index}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-card hover:shadow-2xl transition-all duration-300 neon-border h-full hover-lift">
                    <CardHeader>
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-cyan-500 rounded-2xl flex items-center justify-center mb-6 neon-glow">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <motion.div
                className="animate-float"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Educational technology and AI evaluation interface" 
                  className="rounded-2xl shadow-2xl w-full h-auto dark:neon-glow" 
                />
              </motion.div>
            </AnimatedSection>
            
            <AnimatedSection className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Transform Your{" "}
                <span className="text-primary neon-text">Institution</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Save 75% Grading Time",
                    description: "Reduce manual grading time significantly while maintaining quality and consistency across all evaluations."
                  },
                  {
                    title: "Improve Accuracy",
                    description: "Eliminate human bias and inconsistencies with AI-powered evaluation that learns from your grading patterns."
                  },
                  {
                    title: "Scale Effortlessly", 
                    description: "Handle thousands of answer sheets simultaneously without compromising on evaluation quality or speed."
                  }
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start space-x-4"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 neon-glow">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "98%", label: "Accuracy Rate", icon: Target },
              { value: "75%", label: "Time Saved", icon: Clock },
              { value: "500+", label: "Institutions", icon: Users },
              { value: "1M+", label: "Evaluations", icon: TrendingUp }
            ].map((stat, index) => (
              <AnimatedSection key={index} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-4">
                    <stat.icon className="w-12 h-12 text-primary mx-auto mb-4 neon-glow" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-primary neon-text mb-2">
                    {stat.value}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Form Section */}
      <section id="subscribe" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg dark:dark-gradient-bg opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <Card className="shadow-2xl neon-border backdrop-blur-sm bg-card/95 hover-lift">
              <CardHeader className="text-center pb-10">
                <CardTitle className="text-4xl lg:text-5xl font-bold mb-6">
                  Subscribe Your{" "}
                  <span className="text-primary neon-text">Institution</span>
                </CardTitle>
                <p className="text-xl text-muted-foreground">
                  Join hundreds of educational institutions already using Zhecker to revolutionize their assessment process
                </p>
              </CardHeader>
              
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="instituteName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Institution Name *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter your institution name" 
                                {...field}
                                className="focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="instituteType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Institution Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="university">University</SelectItem>
                                <SelectItem value="college">College</SelectItem>
                                <SelectItem value="school">School</SelectItem>
                                <SelectItem value="training-center">Training Center</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contactPerson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Full name of contact person" 
                                {...field}
                                className="focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="contact@institution.edu" 
                                {...field}
                                className="focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input 
                              type="tel" 
                              placeholder="+1 (555) 123-4567" 
                              {...field}
                              className="focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Requirements (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={4}
                              placeholder="Tell us about your specific evaluation needs..." 
                              {...field}
                              className="focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" required />
                      <label htmlFor="terms" className="text-sm text-muted-foreground">
                        I agree to the{" "}
                        <button type="button" className="text-primary hover:underline">
                          Terms of Service
                        </button>{" "}
                        and{" "}
                        <button type="button" className="text-primary hover:underline">
                          Privacy Policy
                        </button>
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold neon-glow hover:neon-glow-lg transition-all duration-300 transform hover:scale-[1.02] hover-lift"
                      disabled={subscriptionMutation.isPending}
                    >
                      {subscriptionMutation.isPending ? "Subscribing..." : "Subscribe to Zhecker"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src={ZheckerLogo} 
                  alt="Zhecker" 
                  className="w-10 h-10 rounded-lg neon-glow object-contain"
                />
                <h3 className="text-2xl font-bold text-primary neon-text">Zhecker</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Revolutionizing educational assessment with AI-powered subjective answer evaluation.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button className="hover:text-primary transition-colors hover-lift">Features</button></li>
                <li><button className="hover:text-primary transition-colors hover-lift" onClick={() => setShowPricing(true)}>Pricing</button></li>
                <li><button className="hover:text-primary transition-colors hover-lift">Demo</button></li>
                <li><button className="hover:text-primary transition-colors hover-lift">API</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button className="hover:text-primary transition-colors hover-lift">Help Center</button></li>
                <li><button className="hover:text-primary transition-colors hover-lift">Documentation</button></li>
                <li><button className="hover:text-primary transition-colors hover-lift" onClick={() => scrollToSection("subscribe")}>Contact</button></li>
                <li><button className="hover:text-primary transition-colors hover-lift">Training</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>support@zhecker.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Education Ave</li>
                <li>Innovation City, IC 12345</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Zhecker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
