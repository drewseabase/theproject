import type { Syllabus } from "../../../models/syllabus.model.js";

// Syllabus IDs follow the pattern "syllabus-{courseId}"
// courseId must exactly match the IDs defined in courses.ts
// Week numbers run 1–15 covering the full Fall 2026 semester
// Readings are kept realistic but not exhaustive — just enough for demo richness
// and to give the AI engine meaningful topic-to-assignment context

export const mockSyllabi: Syllabus[] = [

  // ============================================================
  // BIO 201 — Cell Biology
  // Textbook: "Molecular Biology of the Cell" — Alberts et al.
  // ============================================================
  {
    id: "syllabus-course-001",
    courseId: "course-001",
    weeklyTopics: [
      {
        weekNumber: 1,
        topic: "Introduction to Cell Biology & the Scientific Method",
        readings: "Chapter 1",
        notes: "Overview of course expectations. Lab safety orientation on Friday.",
      },
      {
        weekNumber: 2,
        topic: "Cell Structure: Prokaryotes vs Eukaryotes",
        readings: "Chapter 2",
        notes: "Microscopy lab begins this week. Lab Report 1 assigned.",
      },
      {
        weekNumber: 3,
        topic: "Cell Membrane Structure & the Fluid Mosaic Model",
        readings: "Chapter 3",
        notes: "Focus on phospholipid bilayer composition and membrane protein types.",
      },
      {
        weekNumber: 4,
        topic: "Membrane Transport: Passive & Active",
        readings: "Chapter 4",
        notes: "Diffusion lab this week. Lab Report 2 assigned. Reading Quiz 1 Friday.",
      },
      {
        weekNumber: 5,
        topic: "DNA Structure, Replication & Repair",
        readings: "Chapter 5",
        notes: "Reading Quiz 2 Wednesday. Begin reviewing Chapters 1–5 for Exam 1.",
      },
      {
        weekNumber: 6,
        topic: "Transcription & Translation: The Central Dogma",
        readings: "Chapter 6",
        notes: "Reading Quiz 3 Monday. Exam 1 this Friday — covers Chapters 1–5.",
      },
      {
        weekNumber: 7,
        topic: "Cellular Respiration: Glycolysis & the Krebs Cycle",
        readings: "Chapter 7",
        notes: "Enzyme kinetics lab this week. Lab Report 3 assigned.",
      },
      {
        weekNumber: 8,
        topic: "Oxidative Phosphorylation & the Electron Transport Chain",
        readings: "Chapter 7 continued",
        notes: "Reading Quiz 4 Friday. Connect to ATP yield calculations.",
      },
      {
        weekNumber: 9,
        topic: "Photosynthesis: Light Reactions & the Calvin Cycle",
        readings: "Chapter 8",
        notes: "Spinach disk photosynthesis lab. Lab Report 4 assigned.",
      },
      {
        weekNumber: 10,
        topic: "Cell Signaling & Signal Transduction Pathways",
        readings: "Chapter 9",
        notes: "Reading Quiz 5 Wednesday. Conceptually dense week — start early.",
      },
      {
        weekNumber: 11,
        topic: "The Cell Cycle: Interphase, Mitosis & Cytokinesis",
        readings: "Chapter 10",
        notes: "Mitosis observation lab. Lab Report 5 assigned. Exam 2 next week.",
      },
      {
        weekNumber: 12,
        topic: "Review & Exam 2: Chapters 6–10",
        readings: "Chapters 6–10 review",
        notes: "Exam 2 Wednesday. No new material introduced this week.",
      },
      {
        weekNumber: 13,
        topic: "Mendelian Genetics & Probability",
        readings: "Chapter 11",
        notes: "Reading Quiz 6 Friday. Lighter week — good time to begin Final Exam prep.",
      },
      {
        weekNumber: 14,
        topic: "Chromosomal Basis of Inheritance & Mutations",
        readings: "Chapter 12–13",
        notes: "Lab Report 5 due Tuesday. Begin comprehensive review for final.",
      },
      {
        weekNumber: 15,
        topic: "Review Week & Final Exam",
        readings: "Comprehensive review: Chapters 1–13",
        notes: "Final Exam Wednesday. Office hours extended Mon–Tue.",
      },
    ],
  },

  // ============================================================
  // CS 310 — Data Structures & Algorithms
  // Language: Java. Textbook: "Introduction to Algorithms" — CLRS
  // ============================================================
  {
    id: "syllabus-course-002",
    courseId: "course-002",
    weeklyTopics: [
      {
        weekNumber: 1,
        topic: "Course Overview, Java Review & Big-O Notation",
        readings: "CLRS Chapter 1–2",
        notes: "Quiz 1 Thursday on Big-O. Review asymptotic notation before class.",
      },
      {
        weekNumber: 2,
        topic: "Arrays, Dynamic Arrays & the ArrayList",
        readings: "CLRS Chapter 3",
        notes: "Project 1 assigned Thursday. Start early — linked list implementation takes time.",
      },
      {
        weekNumber: 3,
        topic: "Linked Lists: Singly & Doubly Linked",
        readings: "CLRS Chapter 10",
        notes: "Quiz 2 Thursday on stacks & queues. Project 1 due end of week.",
      },
      {
        weekNumber: 4,
        topic: "Stacks, Queues & Deques",
        readings: "CLRS Chapter 10 continued",
        notes: "Focus on implementation differences and use case selection.",
      },
      {
        weekNumber: 5,
        topic: "Recursion & Recurrence Relations",
        readings: "CLRS Chapter 4",
        notes: "Quiz 3 Thursday. Understand Master Theorem for exam.",
      },
      {
        weekNumber: 6,
        topic: "Binary Trees: Structure, Traversal & Properties",
        readings: "CLRS Chapter 12",
        notes: "Begin reviewing all content for Midterm Exam next week.",
      },
      {
        weekNumber: 7,
        topic: "Midterm Exam & Binary Search Trees",
        readings: "CLRS Chapter 12 continued",
        notes: "Midterm Tuesday. Project 2 (BST) assigned Thursday. No quiz this week.",
      },
      {
        weekNumber: 8,
        topic: "Balanced BSTs: AVL Trees & Red-Black Trees",
        readings: "CLRS Chapter 13",
        notes: "Conceptually difficult week. Focus on rotation operations.",
      },
      {
        weekNumber: 9,
        topic: "Hash Tables: Design, Hashing & Collision Resolution",
        readings: "CLRS Chapter 11",
        notes: "Quiz 4 Thursday. Project 2 due end of week.",
      },
      {
        weekNumber: 10,
        topic: "Heaps & Priority Queues",
        readings: "CLRS Chapter 6",
        notes: "Connect heap structure to heapsort algorithm.",
      },
      {
        weekNumber: 11,
        topic: "Graphs: Representations, BFS & DFS",
        readings: "CLRS Chapter 22",
        notes: "Quiz 5 Thursday. Project 3 (Graph Traversal) assigned. Start immediately.",
      },
      {
        weekNumber: 12,
        topic: "Shortest Path Algorithms: Dijkstra & Bellman-Ford",
        readings: "CLRS Chapter 24",
        notes: "Quiz 6 Thursday on sorting. Project 3 due end of next week.",
      },
      {
        weekNumber: 13,
        topic: "Sorting Algorithms: Merge Sort, Quicksort & Heapsort",
        readings: "CLRS Chapter 7–8",
        notes: "Project 3 due Thursday. Know all time/space complexities cold for the final.",
      },
      {
        weekNumber: 14,
        topic: "Dynamic Programming: Memoization & Tabulation",
        readings: "CLRS Chapter 15",
        notes: "Quiz 7 Thursday. Heavy week — dynamic programming is notoriously tricky.",
      },
      {
        weekNumber: 15,
        topic: "Greedy Algorithms, NP-Completeness & Final Review",
        readings: "CLRS Chapter 16, 34",
        notes: "Final Exam Thursday. Cumulative. Emphasis on Weeks 7–15.",
      },
    ],
  },

  // ============================================================
  // ENG 215 — American Literature
  // Texts: Primary works + secondary criticism
  // ============================================================
  {
    id: "syllabus-course-003",
    courseId: "course-003",
    weeklyTopics: [
      {
        weekNumber: 1,
        topic: "Introduction: What is American Literature?",
        readings: "Course packet: introductory essays",
        notes: "Establish working definition of American literary identity. Discussion Post 1 assigned.",
      },
      {
        weekNumber: 2,
        topic: "Modernism & The Great Gatsby",
        readings: "Fitzgerald: The Great Gatsby, Ch. 1–5",
        notes: "Discussion Post 1 due Wednesday. Reading Response 1 assigned.",
      },
      {
        weekNumber: 3,
        topic: "The Great Gatsby & the American Dream",
        readings: "Fitzgerald: The Great Gatsby, Ch. 6–9",
        notes: "Reading Response 1 due Wednesday. Essay 1 assigned Friday.",
      },
      {
        weekNumber: 4,
        topic: "The Harlem Renaissance: Hughes & Hurston",
        readings: "Selected poems by Langston Hughes; Hurston: Their Eyes Were Watching God, Ch. 1–10",
        notes: "Discussion Post 2 due Wednesday. Focus on voice and vernacular.",
      },
      {
        weekNumber: 5,
        topic: "Harlem Renaissance Continued & Social Realism",
        readings: "Hurston: Their Eyes Were Watching God, Ch. 11–20",
        notes: "Essay 1 draft workshop Friday. Bring printed draft.",
      },
      {
        weekNumber: 6,
        topic: "The Depression Era: Steinbeck & Naturalism",
        readings: "Steinbeck: The Grapes of Wrath, Ch. 1–15",
        notes: "Essay 1 due Tuesday. Discussion Post 3 assigned.",
      },
      {
        weekNumber: 7,
        topic: "Steinbeck Continued & Documentary Realism",
        readings: "Steinbeck: The Grapes of Wrath, Ch. 16–30",
        notes: "Discussion Post 3 due Monday. Reading Response 2 due Wednesday.",
      },
      {
        weekNumber: 8,
        topic: "Southern Gothic: Faulkner & O'Connor",
        readings: "Faulkner: The Sound and the Fury (selected); O'Connor: A Good Man is Hard to Find",
        notes: "Discussion Post 4 assigned. Midterm Essay assigned Friday.",
      },
      {
        weekNumber: 9,
        topic: "Postwar Disillusionment: Salinger & Heller",
        readings: "Salinger: The Catcher in the Rye; Heller: Catch-22, Ch. 1–10",
        notes: "Discussion Post 4 due Monday. Peer review draft of Midterm Essay due Friday.",
      },
      {
        weekNumber: 10,
        topic: "Midterm Essay Due & Beat Generation",
        readings: "Kerouac: On the Road (excerpts); Ginsberg: Howl",
        notes: "Midterm Essay due Wednesday. Reading Response 3 assigned.",
      },
      {
        weekNumber: 11,
        topic: "Civil Rights Era: Baldwin & Ellison",
        readings: "Baldwin: Notes of a Native Son; Ellison: Invisible Man, Ch. 1–10",
        notes: "Reading Response 3 due Wednesday. Discussion Post 5 assigned Friday.",
      },
      {
        weekNumber: 12,
        topic: "Second Wave Feminism in American Fiction",
        readings: "Plath: The Bell Jar; Le Guin: The Left Hand of Darkness (excerpts)",
        notes: "Discussion Post 5 due Monday. Essay 2 assigned Wednesday.",
      },
      {
        weekNumber: 13,
        topic: "Postmodernism: DeLillo & Pynchon",
        readings: "DeLillo: White Noise, Part 1; course packet on postmodern theory",
        notes: "Essay 2 due Monday. Reading Response 4 assigned.",
      },
      {
        weekNumber: 14,
        topic: "Contemporary Voices: Morrison & Lahiri",
        readings: "Morrison: Beloved, Part 1; Lahiri: The Namesake, Ch. 1–6",
        notes: "Reading Response 4 due Wednesday. Final Essay assigned — begin outlining now.",
      },
      {
        weekNumber: 15,
        topic: "Synthesis: American Identity Across the Century",
        readings: "Course packet: synthesis essays",
        notes: "Final Essay due Tuesday. Last class is discussion — no new reading.",
      },
    ],
  },

  // ============================================================
  // MATH 240 — Linear Algebra
  // Textbook: "Linear Algebra and Its Applications" — David Lay
  // ============================================================
  {
    id: "syllabus-course-004",
    courseId: "course-004",
    weeklyTopics: [
      {
        weekNumber: 1,
        topic: "Systems of Linear Equations & Row Reduction",
        readings: "Lay Chapter 1.1–1.2",
        notes: "Problem Set 1 assigned Thursday. Homework due every Thursday at midnight.",
      },
      {
        weekNumber: 2,
        topic: "Vector Equations & the Matrix Equation Ax = b",
        readings: "Lay Chapter 1.3–1.5",
        notes: "Problem Set 1 due Thursday. Problem Set 2 assigned.",
      },
      {
        weekNumber: 3,
        topic: "Solution Sets & Linear Independence",
        readings: "Lay Chapter 1.6–1.7",
        notes: "Problem Set 2 due Thursday. Problem Set 3 assigned.",
      },
      {
        weekNumber: 4,
        topic: "Matrix Operations: Multiplication, Transpose & Inverse",
        readings: "Lay Chapter 2.1–2.3",
        notes: "Problem Set 3 due Thursday. Problem Set 4 assigned.",
      },
      {
        weekNumber: 5,
        topic: "Vector Spaces & Subspaces",
        readings: "Lay Chapter 4.1–4.2",
        notes: "Problem Set 4 due Thursday. Problem Set 5 assigned. Conceptual shift — read carefully.",
      },
      {
        weekNumber: 6,
        topic: "Basis, Dimension & Rank",
        readings: "Lay Chapter 4.3–4.6",
        notes: "Problem Set 5 due Thursday. Begin reviewing Chapters 1–4 for Exam 1 next week.",
      },
      {
        weekNumber: 7,
        topic: "Exam 1 & Determinants",
        readings: "Lay Chapter 3.1–3.2",
        notes: "Exam 1 Tuesday. Problem Set 6 assigned Thursday. No problem set due this week.",
      },
      {
        weekNumber: 8,
        topic: "Determinants: Properties & Applications",
        readings: "Lay Chapter 3.3",
        notes: "Problem Set 6 due Thursday. Connect determinants to invertibility.",
      },
      {
        weekNumber: 9,
        topic: "Eigenvalues & Eigenvectors",
        readings: "Lay Chapter 5.1–5.2",
        notes: "Problem Set 6 due Thursday. Problem Set 7 assigned. This material appears heavily on Exam 2.",
      },
      {
        weekNumber: 10,
        topic: "Diagonalization & Applications",
        readings: "Lay Chapter 5.3–5.4",
        notes: "Problem Set 7 due Thursday. Exam 2 next week — begin reviewing Chapters 3–5.",
      },
      {
        weekNumber: 11,
        topic: "Exam 2 & Orthogonality Introduction",
        readings: "Lay Chapter 6.1–6.2",
        notes: "Exam 2 Tuesday. Problem Set 8 assigned Thursday.",
      },
      {
        weekNumber: 12,
        topic: "Orthogonal Sets, Projections & the Gram-Schmidt Process",
        readings: "Lay Chapter 6.3–6.4",
        notes: "Problem Set 8 due Thursday. Problem Set 9 assigned.",
      },
      {
        weekNumber: 13,
        topic: "Least Squares Problems & Applications",
        readings: "Lay Chapter 6.5–6.6",
        notes: "Problem Set 9 due Thursday. Problem Set 10 assigned.",
      },
      {
        weekNumber: 14,
        topic: "Symmetric Matrices, Quadratic Forms & SVD",
        readings: "Lay Chapter 7.1–7.4",
        notes: "Problem Set 10 due Thursday. Begin comprehensive final review.",
      },
      {
        weekNumber: 15,
        topic: "Applications of Linear Algebra & Final Review",
        readings: "Lay Chapter 7.5 + review packet",
        notes: "Final Exam Tuesday. Office hours extended all of finals week.",
      },
    ],
  },

  // ============================================================
  // HIST 150 — Modern World History
  // Textbook: "The Modern World" — course reader + primary sources
  // ============================================================
  {
    id: "syllabus-course-005",
    courseId: "course-005",
    weeklyTopics: [
      {
        weekNumber: 1,
        topic: "Introduction: How to Read History & the Pre-WWI World Order",
        readings: "Course reader pp. 1–20",
        notes: "Discussion Post 1 assigned. Learn to distinguish primary vs secondary sources.",
      },
      {
        weekNumber: 2,
        topic: "The Causes of World War I: Alliances, Nationalism & Assassination",
        readings: "Course reader pp. 21–45; Primary: Austro-Hungarian ultimatum to Serbia",
        notes: "Discussion Post 1 due Wednesday. Reading Response 1 assigned Friday.",
      },
      {
        weekNumber: 3,
        topic: "WWI: Trench Warfare, Technology & the Western Front",
        readings: "Course reader pp. 46–70; Primary: soldier letters",
        notes: "Reading Response 1 due Friday.",
      },
      {
        weekNumber: 4,
        topic: "The Treaty of Versailles & Its Consequences",
        readings: "Course reader pp. 71–90; Primary: Versailles Treaty excerpts",
        notes: "Discussion Post 2 assigned Wednesday. Reading Response 2 assigned Friday.",
      },
      {
        weekNumber: 5,
        topic: "The Rise of Fascism: Italy & Germany",
        readings: "Course reader pp. 91–120; Primary: Mussolini's Doctrine of Fascism",
        notes: "Discussion Post 2 due Monday. Reading Response 2 due Friday.",
      },
      {
        weekNumber: 6,
        topic: "WWII: Origins, Blitzkrieg & the Fall of France",
        readings: "Course reader pp. 121–150",
        notes: "Reading Response 3 assigned Friday. Revisit Versailles connection.",
      },
      {
        weekNumber: 7,
        topic: "WWII: The Pacific Theater & American Entry",
        readings: "Course reader pp. 151–175; Primary: FDR Day of Infamy speech",
        notes: "Discussion Post 3 assigned Wednesday.",
      },
      {
        weekNumber: 8,
        topic: "The Holocaust: Causes, Mechanisms & Historiography",
        readings: "Goldhagen excerpt; Browning: Ordinary Men, Ch. 1–5",
        notes: "Discussion Post 3 due Monday. Sensitive material — read thoughtfully.",
      },
      {
        weekNumber: 9,
        topic: "WWII Conclusion: Allied Strategy, D-Day & Victory",
        readings: "Course reader pp. 176–200",
        notes: "Reading Response 3 due Friday. Midterm Essay assigned — topic selection due.",
      },
      {
        weekNumber: 10,
        topic: "Cold War Origins: Ideology, Containment & the Truman Doctrine",
        readings: "Course reader pp. 201–230; Primary: Kennan's Long Telegram",
        notes: "Discussion Post 4 assigned. Midterm Essay draft due Friday for peer review.",
      },
      {
        weekNumber: 11,
        topic: "Decolonization: India, Algeria & the End of Empire",
        readings: "Course reader pp. 231–260; Primary: Gandhi and Fanon excerpts",
        notes: "Discussion Post 4 due Monday. Midterm Essay due Wednesday.",
      },
      {
        weekNumber: 12,
        topic: "The Vietnam War & the Limits of American Power",
        readings: "Course reader pp. 261–290; Primary: Pentagon Papers excerpts",
        notes: "Reading Response 4 assigned Friday.",
      },
      {
        weekNumber: 13,
        topic: "The Fall of the Soviet Union & the End of the Cold War",
        readings: "Course reader pp. 291–320",
        notes: "Reading Response 4 due Friday. Discussion Post 5 assigned.",
      },
      {
        weekNumber: 14,
        topic: "Globalization, 9/11 & the War on Terror",
        readings: "Course reader pp. 321–355; Primary: Bush Doctrine excerpts",
        notes: "Discussion Post 5 due Monday. Reading Response 5 assigned Wednesday. Final Exam assigned.",
      },
      {
        weekNumber: 15,
        topic: "The 21st Century World & Historical Synthesis",
        readings: "Course reader pp. 356–380",
        notes: "Reading Response 5 due Wednesday. Final Exam Monday of finals week.",
      },
    ],
  },
];