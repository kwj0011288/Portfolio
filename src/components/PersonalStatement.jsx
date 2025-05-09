import React from "react";

const PersonalStatement = () => {
  return (
    <section id="personal-statement" className="section">
      <div className="container reveal-up">
        <h2 className="headline-2 mb-8 reveal-up">Personal Statement</h2>

        <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12 ring-1 ring-zinc-50/10 hover:ring-zinc-50/20 transition-all dark:bg-zinc-800/50 dark:ring-zinc-50/10 dark:hover:ring-zinc-50/20">
          <div className="space-y-8">
            <div className="reveal-up">
              <h3 className="text-2xl font-medium mb-3 text-zinc-800 dark:text-zinc-50">
                My Journey in Computer Science
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 md:text-lg leading-relaxed">
                I first became interested in computer science after moving to
                the United States from Korea. Before that, I studied violin, but
                learning how software works and seeing how code could create
                something useful completely changed the way I thought.
                Programming felt like a perfect blend of clarity and creativity.
                Just as I used to express emotion through music, I began solving
                problems through logic and structure.
                <br />
                <br />
                At the University of Maryland, I expanded my interest by taking
                courses like algorithms, artificial intelligence, and network
                security. These courses challenged me, but they also helped me
                build a solid foundation in both theory and practice. Through
                class assignments and hands-on labs, I began to see how
                computing could be applied to real-world problems.
                <br />
                <br />
                One of the most important experiences that shaped my direction
                was building a mobile app called August. I created it with a
                friend to help students generate better class schedules. Each
                semester, we noticed students struggling to coordinate their
                classes and free time. We built August with Flutter to solve
                that problem, and it now helps hundreds of students not only
                make efficient schedules but also find overlapping time with
                friends. That project showed me how powerful it is to understand
                users emotionally, not just technically.
                <br />
                <br />
                After that, I worked on many projects, from apps to AI systems
                that assess couple compatibility and research that involved
                simulations. I enjoy both the visual design and the code, but
                what excites me most is using technology to solve meaningful
                human problems—whether it is stress, confusion, or the feeling
                of being alone. I want to build tools that are helpful, kind,
                and easy to use.
                <br />
                <br />
                In the future, I hope to continue creating technology that
                improves people’s lives in thoughtful and practical ways.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalStatement;
