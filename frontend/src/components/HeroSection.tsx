export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-primary/5 to-background border-b">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <img
              src="/assets/generated/legal-hero-icon.dim_256x256.png"
              alt="Legal Document Icon"
              className="h-32 w-32 md:h-40 md:w-40 object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Professional Legal Documents,
            <br />
            <span className="text-primary">Made Simple</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Create customized legal documents in minutes. Our platform provides professionally crafted templates 
            for NDAs, contracts, agreements, and more—tailored to your specific needs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Easy to Use</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Instant Download</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
