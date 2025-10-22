import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, MessageCircle, Zap, BarChart3, Clock, Users, Sparkles } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Vendra Lite</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-primary transition">
              Features
            </a>
            <a href="#pricing" className="text-sm hover:text-primary transition">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm hover:text-primary transition">
              Testimonials
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <span className="text-sm font-medium text-primary">Powered by AI</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
                Your AI Business Assistant on WhatsApp
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Automate customer replies, generate captions, schedule broadcasts, and grow your business—all through
                WhatsApp. Built for African entrepreneurs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Watch Demo
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">No credit card required. 14-day free trial.</p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 border border-primary/20">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/30"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-primary/20 rounded w-3/4"></div>
                      <div className="h-3 bg-primary/10 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-primary/20 rounded w-3/4 ml-auto"></div>
                      <div className="h-3 bg-primary/10 rounded w-1/2 ml-auto"></div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/30"></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/30"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-primary/20 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold">10K+</div>
              <p className="text-sm text-muted-foreground mt-2">Active Businesses</p>
            </div>
            <div>
              <div className="text-3xl font-bold">50M+</div>
              <p className="text-sm text-muted-foreground mt-2">Messages Sent</p>
            </div>
            <div>
              <div className="text-3xl font-bold">95%</div>
              <p className="text-sm text-muted-foreground mt-2">Customer Satisfaction</p>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <p className="text-sm text-muted-foreground mt-2">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features for Your Business</h2>
            <p className="text-xl text-muted-foreground">Everything you need to manage your business on WhatsApp</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI Caption Generator",
                description:
                  "Generate engaging product captions in seconds with AI. Perfect for social media and WhatsApp.",
              },
              {
                icon: MessageCircle,
                title: "Auto-Reply Templates",
                description:
                  "Set up smart auto-replies for common customer questions. Save time and improve response rates.",
              },
              {
                icon: Clock,
                title: "Scheduled Broadcasts",
                description: "Plan and schedule messages to reach customers at the perfect time. Maximize engagement.",
              },
              {
                icon: BarChart3,
                title: "Analytics Dashboard",
                description: "Track message performance, customer engagement, and business metrics in real-time.",
              },
              {
                icon: Users,
                title: "Customer Management",
                description: "Organize and segment your customer base. Send targeted messages to specific groups.",
              },
              {
                icon: Zap,
                title: "Instant Setup",
                description: "Connect your WhatsApp account in minutes. No technical knowledge required.",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 border border-border hover:border-primary/50 transition">
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your business</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "₦5,000",
                period: "/month",
                description: "Perfect for small businesses",
                features: ["Up to 1,000 messages/month", "Basic auto-replies", "Caption generator", "Email support"],
              },
              {
                name: "Professional",
                price: "₦15,000",
                period: "/month",
                description: "For growing businesses",
                features: [
                  "Up to 10,000 messages/month",
                  "Advanced auto-replies",
                  "Scheduled broadcasts",
                  "Analytics",
                  "Priority support",
                ],
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "pricing",
                description: "For large operations",
                features: [
                  "Unlimited messages",
                  "Custom integrations",
                  "Dedicated account manager",
                  "API access",
                  "24/7 support",
                ],
              },
            ].map((plan, idx) => (
              <Card
                key={idx}
                className={`p-8 border ${plan.highlighted ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
                <Button className="w-full mb-6" variant={plan.highlighted ? "default" : "outline"}>
                  Get Started
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Business Owners</h2>
            <p className="text-xl text-muted-foreground">See what our customers have to say</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Chioma Okafor",
                role: "Fashion Entrepreneur",
                text: "Vendra Lite has transformed how I manage my customers. I save hours every week on replies and captions!",
              },
              {
                name: "Kwame Mensah",
                role: "E-commerce Store Owner",
                text: "The analytics dashboard gives me insights I never had before. I can now make data-driven decisions for my business.",
              },
              {
                name: "Amara Nwosu",
                role: "Beauty Products Seller",
                text: "Setting up was so easy. Within 10 minutes, I had auto-replies working. Highly recommend!",
              },
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-6 border border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-primary rounded-full"></div>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of African entrepreneurs using Vendra Lite to grow their business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Start Your Free Trial
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold">Vendra Lite</span>
              </div>
              <p className="text-sm text-muted-foreground">Your AI business assistant on WhatsApp</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 Vendra Lite. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground transition">
                LinkedIn
              </a>
              <a href="#" className="hover:text-foreground transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
