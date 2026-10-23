import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    Old addresses from before the plain-names change. They redirect permanently, so bookmarks and shared links
    keep working. These are the only places the old route names remain.
  */
  async redirects() {
    return [
      { source: "/desk", destination: "/home", permanent: true },
      { source: "/board", destination: "/study-board", permanent: true },
      { source: "/notebook", destination: "/notes", permanent: true },
      { source: "/lab", destination: "/progress", permanent: true },
      { source: "/about", destination: "/profile", permanent: true },
      // Cases became Chapters. The specific old lesson routes come first so they redirect in one step.
      { source: "/cases/:caseId/clues/:lessonId", destination: "/chapters/:caseId/lessons/:lessonId", permanent: true },
      { source: "/cases/:caseId/interrogation/:lessonId", destination: "/chapters/:caseId/quiz/:lessonId", permanent: true },
      { source: "/cases/:caseId/verdict", destination: "/chapters/:caseId/final-test", permanent: true },
      { source: "/cases", destination: "/chapters", permanent: true },
      { source: "/cases/:path*", destination: "/chapters/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
