export const initialMockAnalysis = {
  sentiment: {
    positive: 45,
    neutral: 20,
    negative: 35,
  },
  summary: "Users love the sleek UI and quick response times, but multiple crash reports have surfaced regarding dark mode rendering and billing export errors.",
  items: [
    {
      id: "1",
      type: "bug",
      urgency: "high",
      title: "App crashes on toggle to Dark Mode",
      description: "Several iOS users report that switching to dark mode in settings immediately freezes the UI and causes a forced crash.",
      source: "App Store Review"
    },
    {
      id: "2",
      type: "bug",
      urgency: "medium",
      title: "PDF invoice export returns 500 error",
      description: "Attempting to download the monthly subscription receipt results in a blank page or server error.",
      source: "Support Ticket #402"
    },
    {
      id: "3",
      type: "feature",
      urgency: "high",
      title: "Add CSV Export for Monthly Analytics",
      description: "Multiple team leads requested an automated CSV download option for monthly performance charts.",
      source: "Feedback Form"
    },
    {
      id: "4",
      type: "praise",
      urgency: "low",
      title: "Fast search indexing and clean layout",
      description: "The recent update made search 10x faster. The dashboard feels much cleaner now!",
      source: "Trustpilot Review"
    }
  ],
  responseDraft: "Hello!\n\nThank you for sharing your detailed feedback with us. We apologize for the issues you've experienced with dark mode stability and PDF invoice exports—our engineering team is actively investigating both items for a hotfix. We're also glad to hear you enjoy the faster search performance, and we've added CSV analytics exports to our immediate product roadmap.\n\nBest regards,\nThe Product Team"
};