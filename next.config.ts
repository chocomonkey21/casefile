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
      { source: "/cases/:caseId/clues/:lessonId", destination: "/cases/:caseId/lessons/:lessonId", permanent: true },
      { source: "/cases/:caseId/interrogation/:lessonId", destination: "/cases/:caseId/quiz/:lessonId", permanent: true },
      { source: "/cases/:caseId/verdict", destination: "/cases/:caseId/final-test", permanent: true },
    ];
  },
};

export default nextConfig;
