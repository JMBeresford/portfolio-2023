import artofjayjoson0 from "@/assets/img/artofjayjoson/0.jpeg";
import artofjayjoson1 from "@/assets/img/artofjayjoson/1.jpeg";
import artofjayjoson2 from "@/assets/img/artofjayjoson/2.jpeg";
import artofjayjoson3 from "@/assets/img/artofjayjoson/3.jpeg";
import artofjayjoson4 from "@/assets/img/artofjayjoson/4.jpeg";

import ucscChessClub0 from "@/assets/img/ucscchessclub/0.jpeg";
import ucscChessClub1 from "@/assets/img/ucscchessclub/1.jpeg";
import ucscChessClub2 from "@/assets/img/ucscchessclub/2.jpeg";
import ucscChessClub3 from "@/assets/img/ucscchessclub/3.jpeg";
import ucscChessClub4 from "@/assets/img/ucscchessclub/4.jpeg";

import deforestationDetector0 from "@/assets/img/deforestationdetector/0.jpeg";
import deforestationDetector1 from "@/assets/img/deforestationdetector/1.jpeg";
import deforestationDetector2 from "@/assets/img/deforestationdetector/2.jpeg";
import deforestationDetector3 from "@/assets/img/deforestationdetector/3.jpeg";
import deforestationDetector4 from "@/assets/img/deforestationdetector/4.jpeg";

import { StateCreator } from "zustand";
import type { State } from "..";

export type Work = {
  title: string;
  client: string;
  role: string;
  description: string;
  images: string[];
  color: string;
  live?: string;
  source?: string;
  year: number;
};

export type WorksState = { works: { [key: string]: Work } };

export const worksSlice: StateCreator<State, [], [], WorksState> = set => ({
  works: {
    deforestationDetector: {
      title: "Deforestation Detector",
      client: "N/A",
      role: "Lead Developer/Designer",
      description: `\
As a group of friends passionate about making a positive impact in the world, we \
decided to embark on a pet project that could contribute, no matter how small. \
We set our sights on the issue of deforestation, and aimed to create something \
that would increase visibility of it and promote efforts to reduce it.

To achieve our goal, we split into two small teams. One team utilized deep learning \
techniques to label various images of the rainforest and determine the level of \
deforestation in each image, while the other team used web and graphics technologies \
to visualize the predictions generated from the deep learning model.

As the lead for the web-based team, I was responsible for guiding the team in \
creating an immersive web experience that would utilize a 3D model of an area of the \
rainforest to showcase the different levels and causes of deforestation in that area.

Drawing on extensive research, we developed a web experience that provided users with \
extensive information on deforestation, its causes, and its impact on the environment. \
Using our 3D model, users were able to explore the effects of deforestation in real-time \
and gain a deeper understanding of the issue.
      `,
      images: [
        deforestationDetector0.src,
        deforestationDetector1.src,
        deforestationDetector2.src,
        deforestationDetector3.src,
        deforestationDetector4.src,
      ],
      color: "#007D5C",
      live: "http://deforestationdetector.com/",
      source: "https://github.com/Deforestation-Detector/web",
      year: 2022,
    },
    artOfJayJoson: {
      title: "Art of Jay Joson",
      client: "Jay Joson",
      role: "Lead Developer/Designer",
      description: `\
Looking for a sleek and modern web experience to showcase his impressive portfolio, \
Jay Joson approached us for a web design and development project. As an illustrator, \
animator, and character creator based in California, Jay was looking for a website that \
would highlight his selected work in a visually appealing way.

With Jay's vision in mind, I created a sleek and modern static website that would \
highlight his artwork in a minimalist and user-friendly way. In addition, I set up \
a hosting provider that reduced the monthly cost of his website by over 60%, \
providing significant cost savings without compromising the website's reliability and \
availability.

To further empower Jay, I set up a content management system that would allow him \
to update, configure, and curate his own works after handing ownership over to him. This \
gave Jay complete control over his website, ensuring that he could keep it up to date with \
his latest creations and maintain the integrity of his portfolio.
    `,
      images: [
        artofjayjoson0.src,
        artofjayjoson1.src,
        artofjayjoson2.src,
        artofjayjoson3.src,
        artofjayjoson4.src,
      ],
      color: "#8657b1",
      live: "http://artofjayjoson.com/",
      source: "https://github.com/JMBeresford/art-of-jay-joson",
      year: 2020,
    },
    ucscChessClub: {
      title: "UCSC Chess Club",
      client: "UCSC Chess Club",
      role: "Lead Developer/Designer",
      description: `\
In the world of competitive chess, accurate rankings are essential for friendly competition \
and growth as players. Unfortunately, we found that existing online rated chess \
apps were simply too broad to accommodate our needs as a chess club.

As a member of the chess club, I was proud to lead the effort in creating a self-hosted \
web application that enabled local rated chess matches. This application was designed to \
be restricted solely to members of our club, which prevented any external players from \
conflating our relative rankings.

Using a standard ELO rating system, we were able to collect data that accurately rated \
each member relative to each other. This data was completely controlled by the club, \
ensuring the integrity of our rankings and the environment of play.
    `,
      images: [
        ucscChessClub0.src,
        ucscChessClub1.src,
        ucscChessClub2.src,
        ucscChessClub3.src,
        ucscChessClub4.src,
      ],
      color: "#B39554",
      source: "https://github.com/JMBeresford/UCSC-chessclub",
      year: 2021,
    },
  },
});
