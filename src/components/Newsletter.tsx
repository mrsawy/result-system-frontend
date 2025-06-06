import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Newsletter = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Subscribed!");
  };

  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          هل أنت مستعد للتفوق في
          {" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            رحلتك الأكاديمية ؟
          </span>
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          انضم إلى آلاف الطلاب الذين يستخدمون بالفعل ابن الدورة التعليمي للوصول إلى الموارد والتدرب على الأسئلة السابقة والاستعداد للامتحانات.        </p>

        <form
          className="flex justify-center items-center gap-4"
          onSubmit={handleSubmit}
        >
          {/* <Input
            placeholder="leomirandadev@gmail.com"
            className="bg-muted/50 dark:bg-muted/80 "
            aria-label="email"
          /> */}
          <Button>Subscribe</Button>
        </form>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};
