<script setup>
import Experience from "./Experience.vue";
</script>

<template>
  <div :class="s.pageHeading">
    <h1>Tim Harding</h1>
    <a href="/resume.pdf">Download PDF</a>
  </div>

  <h2 class="sr">Contact</h2>

  <h2>Education</h2>

  <Experience role="BS in Computer Science" institution="Western Washington University" gpa="3.9"
    :when="[2020, 2023]" />

  <ul>
    <li>
      Lead author of a research paper about Elvis, an internet simulator written
      in Rust
    </li>
    <li>
      Designed a system architecture that enables multithreaded communication
      between tens of thousands of networked virtual devices
    </li>
    <li>
      Wrote a custom networking protocol stack with IP, TCP, and UDP, allowing
      for user extensibility and zero-copy packet delivery and manipulation
    </li>
    <li>Helped onboard thirteen graduate and undergraduate collaborators</li>
  </ul>

  <Experience role="AAS in Commercial Photography" institution="Seattle Central College" gpa="3.6"
    :when="[2013, 2015]" />

  <ul>
    <li>
      Voted #1 portfolio of graduating class by a panel of judges
    </li>
  </ul>

  <h2>Work</h2>

  <Experience role="Teaching Assistant" institution="Western Washington University" location="Bellingham, WA"
    :when="2024" />

  <ul>
    <li>
      Ran labs, graded assignments, captioned videos, protored exams, and
      addressed student feedback on assignments
    </li>
  </ul>

  <Experience role="Systems Builder" institution="Candela Technologies" location="Ferndale, WA" :when="[2022, 2023]" />

  <ul>
    <li>
      Assembled and tested orders for customized computer network testing devices
    </li>
  </ul>

  <Experience role="Technical Artist" institution="Ten Gun Design" location="Edmonds, WA" :when="[2016, 2020]" />

  <ul>
    <li>
      Optimized Hololens graphics for the Holoisland demo to run at 60FPS, up
      from as low as 10FPS
    </li>
    <li>
      Shipped a point-and-click adventure game for training Microsoft retail
      employees
    </li>
    <li>
      Delivered a Unity-based choose-your-own-adventure film toolkit to
      Microsoft for training videos
    </li>
    <li>
      Lead development of a yearlong Unity VR automotive demo with a networked
      AR companion app
    </li>
    <li>
      Wrote over 35 plugins and apps for artists to automate common tasks and
      simplify workflows
    </li>
    <li>
      Produced hundreds of images and videos for Microsoft, Amazon, Paccar,
      Micron, Funko, and PowerA
    </li>
  </ul>

  <Experience role="3D Scanning Specialist" institution="Prizmiq" location="Seattle, WA" :when="[2015, 2016]" />

  <ul>
    <li>
      Built and operated a photogrammetry content pipeline for web-based 3D
      e-commerce visuals, delivering 100 assets to Shoes.com, Dye Precision, and
      the Burke Museum
    </li>
  </ul>

  <Experience role="Sales Associate" institution="Cycle University" location="Seattle, WA" :when="2013" />

  <ul>
    <li>
      Paired customers with their perfect bike and set up test rides
    </li>
    <li>
      Assembled product shipments
    </li>
    <li>
      Ran checkout and helped shoppers navigate the sales floor
    </li>
  </ul>
</template>

<style module="s">
.pageHeading {
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: end;
  margin-bottom: 1.5rem;

  &>a {
    margin-bottom: 0.1875rem;
  }
}

h1,
h2,
p {
  margin: 0rem;
}

h2 {
  padding-bottom: 0.675rem;
  border-bottom: 2px solid var(--surface-0);
  margin-top: 1.5rem;
}
</style>
