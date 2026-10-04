import type { ReactNode } from "react";
import { Photo, ProjectImage, Visit, CoverTitle } from "./page-elements";

export const chapters: { id: string; label: string; left: ReactNode; right: ReactNode }[] = [
  {
    id: "opening-notes",
    label: "The question",
    left: (
      <div className="nb-opening-note">
        <p className="nb-chapter">FIELD NOTES / MUHAMMAD MAAZ</p>
        <h2>
          Everything starts
          <br />
          with a question.
        </h2>
        <p className="nb-lead">
          What could I build?
          <br />
          Who could it help?
          <br />
          What would I learn?
        </p>
        <p className="nb-handnote">Keep scrolling. There’s a story in these pages.</p>
      </div>
    ),
    right: (
      <div className="nb-opening-note nb-opening-cover">
        <p className="nb-chapter">QUESTIONS, BUILDS & LESSONS</p>
        <CoverTitle />
        <p className="nb-lead">
          A notebook of things I’ve tried,
          <br />
          people I’ve learned with,
          <br />
          and work I’ve helped bring to life.
        </p>
      </div>
    ),
  },
  {
    id: "insightify",
    label: "Insightify",
    left: (
      <>
        <p className="nb-chapter">01 / INSIGHTIFY</p>
        <h2>
          An idea I built.
          <br />A story I pitched.
        </h2>
        <p className="nb-lead">
          Exploring AI scam protection through product development and pitching.
        </p>
        <Photo src="pitchfest.jpg" caption="FAST Soventure PitchFest 2025 — Winner" />
        <Photo
          src="aubic.jpeg"
          caption="AUBIC — 1st among 138 teams; selected among 7 startups for permanent incubation."
        />
      </>
    ),
    right: (
      <>
        <ProjectImage name="Insightify" src="insightify.webp" />
        <h2>
          From concept to
          <br />a working product.
        </h2>
        <p className="nb-lead">My contribution: development and pitching.</p>
        <p className="nb-body">
          A mobile app and web platform exploring scam detection and awareness. Building the product
          and presenting it were two parts of the same learning process.
        </p>
        <div className="nb-note">
          <span>IN THE PITCH ROOM</span>
          <p>
            Hult Prize · Air University campus round
            <br />
            <strong>Second runner-up</strong>
          </p>
        </div>
        <p className="nb-handnote">Next question: who could this work help?</p>
      </>
    ),
  },
  {
    id: "fellowship",
    label: "Fellowship",
    left: (
      <>
        <p className="nb-chapter">02 / MILLENNIUM FELLOWSHIP</p>
        <h2>
          A wider circle.
          <br />A clearer purpose.
        </h2>
        <Photo
          src="fellowship-group.webp"
          caption="With fellow participants at Air University, Class of 2025."
        />
        <p className="nb-lead">Building belongs in a conversation about people, too.</p>
        <p className="nb-body">
          The Millennium Fellowship became another chapter alongside my work on Insightify,
          connecting a technical idea with a social-impact context.
        </p>
      </>
    ),
    right: (
      <>
        <p className="nb-chapter">CLASS OF 2025 / GRADUATE</p>
        <Photo
          src="fellowship-graduation.webp"
          caption="My Millennium Fellowship graduation, 2025."
          portrait
        />
        <h2>
          More than
          <br />a product question.
        </h2>
        <p className="nb-body">
          Insightify was my fellowship project: exploring how technology could help people recognise
          digital scams.
        </p>
        <p className="nb-handnote">What we build matters. Who it helps matters just as much.</p>
      </>
    ),
  },
  {
    id: "websmiths",
    label: "WebSmiths",
    left: (
      <>
        <p className="nb-chapter">03 / WEBSMITHS</p>
        <h2>
          From a conversation
          <br />
          to something useful.
        </h2>
        <p className="nb-lead">Where my growth and development experience meet.</p>
        <p className="nb-body">
          With WebSmiths, I worked across outreach, understanding a business’s requirements, closing
          projects, and helping our team bring them to life.
        </p>
        <ol className="nb-process">
          <li>
            <span>01</span>
            <div>
              <strong>Understand the need.</strong>
              <p>Ask questions before deciding what to build.</p>
            </div>
          </li>
          <li>
            <span>02</span>
            <div>
              <strong>Make it tangible.</strong>
              <p>Turn the conversation into a working experience.</p>
            </div>
          </li>
          <li>
            <span>03</span>
            <div>
              <strong>Refine it together.</strong>
              <p>Use the client’s feedback to guide the next iteration.</p>
            </div>
          </li>
        </ol>
        <p className="nb-handnote">The next pages are some of that work.</p>
      </>
    ),
    right: (
      <>
        <ProjectImage name="WebSmiths" src="websmiths.webp" />
        <h2>
          One team.
          <br />
          Different business needs.
        </h2>
        <p className="nb-body">
          Booking systems, business websites, and storefront experiments — brought together in the
          WebSmiths showcase.
        </p>
        <div className="nb-note">
          <span>MY THROUGHLINE</span>
          <p>
            Understand people. Build ideas.
            <br />
            Experiment. Iterate.
          </p>
        </div>
        <Visit href="https://websmiths-one.vercel.app/">Visit WebSmiths</Visit>
      </>
    ),
  },
  {
    id: "gaming",
    label: "Gaming Zone",
    left: (
      <>
        <p className="nb-chapter">04 / GAMING ZONE · CLIENT WORK</p>
        <h2>
          A busy venue.
          <br />
          One place to manage it.
        </h2>
        <p className="nb-lead">
          From understanding the requirements to the first delivery in seven days.
        </p>
        <p className="nb-body">
          We built a booking and management system for a gaming venue, then refined it around the
          client’s feedback.
        </p>
        <div className="nb-note">
          <span>THE TWO SIDES OF THE BUILD</span>
          <p>
            <strong>For players</strong>
            <br />
            Book a session, manage an account, and see reservations.
          </p>
          <p>
            <strong>For the owner</strong>
            <br />
            Track bookings and manage the venue’s day-to-day activity.
          </p>
        </div>
        <p className="nb-handnote">A website on the outside. A working tool underneath.</p>
      </>
    ),
    right: (
      <>
        <ProjectImage name="Demo Gaming" src="demo-gaming.webp" />
        <h2>
          Booking meets
          <br />
          the back office.
        </h2>
        <ul className="nb-features">
          <li>Station availability and slot booking</li>
          <li>Bookings, memberships, and expenses</li>
          <li>A separate administration experience</li>
        </ul>
        <p className="nb-caption">Demo version shown, based on the gaming-venue work.</p>
        <Visit href="https://demo-gaming-site-eight.vercel.app/">Explore the gaming demo</Visit>
      </>
    ),
  },
  {
    id: "farmhouse",
    label: "Farmhouse",
    left: (
      <>
        <p className="nb-chapter">05 / FARMHOUSE · CLIENT WORK</p>
        <h2>
          Helping a stay
          <br />
          start with a booking.
        </h2>
        <p className="nb-lead">
          I brought in and closed the farmhouse project, then worked with our team on its delivery.
        </p>
        <p className="nb-body">
          The experience connects what guests need to know with what staff need to manage:
          availability, reservations, and booking confirmations.
        </p>
        <div className="nb-note">
          <span>THE HANDOVER</span>
          <p>
            The client was satisfied with the delivered project and requested no further changes.
          </p>
        </div>
        <p className="nb-handnote">The conversation and the build belong together.</p>
      </>
    ),
    right: (
      <>
        <ProjectImage name="Grand Royal Farmhouse" src="grand-royal-farmhouse.webp" />
        <h2>
          For the guest.
          <br />
          For the people running it.
        </h2>
        <ul className="nb-features">
          <li>Day, night, and full-day booking slots</li>
          <li>Staff booking and payment management</li>
          <li>Special dates and revenue overview</li>
        </ul>
        <p className="nb-caption">Grand Royal Farmhouse demo presentation; sample data shown.</p>
        <Visit href="https://farmhouse-resort-demo-site.vercel.app/">
          Explore the farmhouse demo
        </Visit>
      </>
    ),
  },
  {
    id: "experiments",
    label: "Experiments",
    left: (
      <>
        <p className="nb-chapter">06 / WEBSMITHS EXPERIMENTS · DEMO</p>
        <ProjectImage name="SmileCare Dental" src="smilecare-dental.webp" />
        <h2>
          A calmer way
          <br />
          to find care.
        </h2>
        <p className="nb-body">
          SmileCare Dental explores a clinic website where treatments, pricing, and appointment
          requests are easy to find.
        </p>
        <ul className="nb-features">
          <li>Treatment browsing and clear pricing</li>
          <li>Appointment requests and WhatsApp follow-up</li>
        </ul>
        <Visit href="https://dentist-demo-orpin.vercel.app/">Explore SmileCare</Visit>
      </>
    ),
    right: (
      <>
        <p className="nb-chapter">ANOTHER AUDIENCE. ANOTHER APPROACH. · DEMO</p>
        <ProjectImage name="Apparels Hub" src="apparels-hub.webp" />
        <h2>
          A storefront
          <br />
          with a point of view.
        </h2>
        <p className="nb-body">
          Apparels Hub explores editorial product presentation for a fashion brand, with browsable
          collections and WhatsApp enquiries.
        </p>
        <p className="nb-caption">
          These are demonstration projects. Figures within their screenshots are sample content.
        </p>
        <Visit href="https://c-lothing-brand.vercel.app/">Explore Apparels Hub</Visit>
      </>
    ),
  },
  {
    id: "growth",
    label: "Growth",
    left: (
      <div className="nb-growth-opening">
        <p className="nb-chapter">07 / OUTSIDE THE BUILD</p>
        <h2>
          Built it.
          <br />
          Now who
          <br />
          <em>needs it?</em>
        </h2>
        <p className="nb-lead">The next pages start with a conversation.</p>
        <p className="nb-body">
          Alongside building, I’ve worked on reaching people: speaking with business owners,
          understanding their needs, and helping them take the next step.
        </p>
        <div className="nb-conversation">
          <span>Ask.</span>
          <span>Listen.</span>
          <span>Learn.</span>
          <span>Follow up.</span>
        </div>
        <p className="nb-handnote">A useful idea needs a way to reach someone.</p>
      </div>
    ),
    right: (
      <>
        <p className="nb-chapter">OZPOS / GROWTH SPECIALIST</p>
        <h2>
          Start with
          <br />
          the restaurant owner.
        </h2>
        <p className="nb-role-date">JUL 2026 — PRESENT · RESTAURANT TECHNOLOGY</p>
        <p className="nb-body">
          Outbound acquisition for an Australian restaurant technology platform — from first contact
          to discovery, qualification, and booking product demonstrations.
        </p>
        <ul className="nb-features">
          <li>Calls, email, needs discovery, and product-demo bookings</li>
          <li>Consistent follow-ups and CRM records</li>
          <li>Social content and Google Business Profile management</li>
        </ul>
        <div className="nb-note">
          <span>ON THE GROUND</span>
          <p>
            I also visited local restaurants to generate interest while exploring the Pakistan
            market with the team.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "conversations",
    label: "In the field",
    left: (
      <>
        <p className="nb-chapter">08 / VOCAL CYBRIDGE</p>
        <h2>
          Learning to start
          <br />
          the conversation.
        </h2>
        <p className="nb-role-date">
          CUSTOMER SALES REPRESENTATIVE
          <br />
          MAY — AUG 2024
        </p>
        <p className="nb-body">
          Outbound sales experience serving the Canadian market, through cold calling and email.
        </p>
        <div className="nb-note">
          <span>THE WORK</span>
          <p>
            Prospect, qualify interest, handle objections, and follow the conversation through to a
            decision.
          </p>
        </div>
        <p className="nb-lead">
          A practical grounding in explaining an offer to someone who has not asked to hear it yet.
        </p>
        <p className="nb-handnote">Clarity earns the next question.</p>
      </>
    ),
    right: (
      <>
        <p className="nb-chapter">YOUTH CLUB / FIELD MARKETING</p>
        <h2>
          Sometimes outreach
          <br />
          means showing up.
        </h2>
        <p className="nb-role-date">
          FIELD MARKETING COORDINATOR
          <br />
          DEC 2023 — DEC 2024
        </p>
        <p className="nb-body">
          On-the-ground marketing for the Winds of Change event, including direct outreach to local
          schools and colleges.
        </p>
        <ul className="nb-features">
          <li>Pitched event partnerships to school and college administrations</li>
          <li>Supported local lead generation and event promotion</li>
          <li>Contributed to social media promotion</li>
        </ul>
        <div className="nb-note">
          <span>RECOGNITION</span>
          <p>Received a certificate of appreciation for campaign execution and promotion.</p>
        </div>
        <p className="nb-handnote">Same curiosity. Different rooms.</p>
      </>
    ),
  },
  {
    id: "continuing",
    label: "The next chapter",
    left: (
      <div className="nb-final-note">
        <p className="nb-chapter">A NOTE BEFORE I CLOSE THIS BOOK</p>
        <h2>
          The journey
          <br />
          still continues.
        </h2>
        <p className="nb-lead">
          Some questions became products.
          <br />
          Some became conversations.
          <br />
          All of them gave me something to learn.
        </p>
        <p className="nb-handnote">There’s always another page to write.</p>
      </div>
    ),
    right: (
      <div className="nb-final-note">
        <p className="nb-chapter">THE PERSON BEHIND THE PAGES</p>
        <h2>
          Many interests.
          <br />
          One curious mind.
        </h2>
        <p className="nb-body">
          I’m Maaz. I move between customer conversations, ideas, and building — following the
          questions that lead to useful work.
        </p>
        <p className="nb-body">
          This notebook brings those parts of me together. The next chapter might begin with someone
          I haven’t met yet.
        </p>
        <p className="nb-handnote">
          Keep scrolling to close the diary.
          <br />
          You’ll find me on the cover.
        </p>
      </div>
    ),
  },
];
