import { Beaker, FlaskConical, Layers, Lightbulb, Users } from "lucide-react";

export default function Bgt() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#03071E] via-[#2F114A] to-[#9D4EDD] pb-24 pt-16">
      <main className="container relative mx-auto px-6 py-20">
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-[#2F114A]"></div>
          <div className="relative rounded-2xl border border-white/10 p-10 shadow-2xl md:p-12">
            <div className="flex flex-col gap-10">
              {/* Header Section */}
              <div className="space-y-4">
                <h1 className="shadow-text mb-6 text-4xl font-bold text-yellow-accent md:text-5xl">
                  Bees Got Talent
                </h1>
                <p className="text-lg leading-relaxed text-gray-200 md:text-xl">
                  Bees Got Talent (BGT) is a celebration of creativity,
                  ingenuity, and innovative problem-solving. This vibrant event
                  will showcase a wide array of imaginative projects, Talent
                  show acts, and inventions crafted by amateur innovators and
                  enthusiasts from NUST and universities all around Pakistan.
                  Participants will have the chance to present their ideas and
                  creations to an audience that includes peers, mentors,
                  industry experts, and a panel of esteemed judges.
                </p>
              </div>

              <div className="grid gap-12 md:grid-cols-2">
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-accent/20 flex h-10 w-10 items-center justify-center rounded-full">
                      <Beaker className="h-5 w-5 text-yellow-accent" />
                    </div>
                    <h2 className="text-2xl font-semibold text-yellow-bright">
                      Registration Criteria
                    </h2>
                  </div>
                  <p className="pl-14 leading-relaxed text-gray-200">
                    Your ideas can range from a play, musical performances,
                    setting a record (Rubik's cube under a minute)etc to any
                    unique talent or project you may wish to showcase.
                  </p>
                </section>

                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-accent/20 flex h-10 w-10 items-center justify-center rounded-full">
                      <Lightbulb className="h-5 w-5 text-yellow-accent" />
                    </div>
                    <h2 className="text-2xl font-semibold text-yellow-bright">
                      Rules
                    </h2>
                  </div>
                  <ul className="space-y-4 pl-14">
                    <li className="group flex items-center gap-3 text-gray-200"></li>
                    <li className="group flex items-center gap-3 text-gray-200">
                      <Users className="text-yellow-accent/70 h-5 w-5 transition-colors group-hover:text-yellow-accent" />
                      Refrain from submitting any inappropriate acts/shows.
                    </li>
                    <li className="group flex items-center gap-3 text-gray-200">
                      <Layers className="text-yellow-accent/70 h-5 w-5 transition-colors group-hover:text-yellow-accent" />
                      Selected candidates will receive a confirmation email
                      along with further details
                    </li>
                  </ul>
                </section>
              </div>

              {/* Register Here Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-accent/20 flex h-10 w-10 items-center justify-center rounded-full">
                    <FlaskConical className="h-5 w-5 text-yellow-accent" />
                  </div>
                  <h2 className="text-2xl font-semibold text-yellow-bright">
                    Register Here
                  </h2>
                </div>
                <div className="w-full">
                  {/* Embed Google Form */}
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdGNzXJkkSQJJnJ-j0q0kvu-UfSQkeHk0x9uiRri925mV_UYw/viewform?embedded=true"
                    width="100%"
                    height="600"
                    className="rounded-lg"
                    title="Registration Form"
                  >
                    Loading…
                  </iframe>
                </div>
                <div className="flex justify-center">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdGNzXJkkSQJJnJ-j0q0kvu-UfSQkeHk0x9uiRri925mV_UYw/viewform?embedded=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-yellow-accent/90 inline-block rounded bg-yellow-accent px-6 py-3 text-lg font-semibold text-white"
                  >
                    Open in New Tab
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
