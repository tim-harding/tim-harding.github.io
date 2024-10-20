<script setup>
import Experience from "./Experience.vue"
</script>

<div class="page-heading">
  <h1>Tim Harding</h1>
  <a>Download PDF</a>
</div>

<h2 class="sr">Contact</h2>

<ul class="contact">
  <li href="tel:+12068524199">
    <address>
      (206) 852-4199
    </address>
  </li>
  <li href="mailto:tim@timharding.co">
    <address>
      Tim@TimHarding.co
    </address>
  </li>
  <li href="https://www.linkedin.com/in/timothy-j-harding/">
    LinkedIn
  </li>
  <li href="https://github.com/tim-harding/">
    GitHub
  </li>
</ul>

## Education

<Experience
  role="BS in Computer Science"
  institution="Western Washington University"
  gpa="3.9"
  :when="[2020, 2023]"
/>

<ul class="bullets">
  <li>
    Lead author of a research paper about Elvis, an internet simulator written in Rust
  </li>
  <li>
    Designed a system architecture that enables multithreaded communication between tens of thousands of networked virtual devices
  </li>
  <li>
    Wrote a custom networking protocol stack with IP, TCP, and UDP, allowing for user extensibility and zero-copy packet delivery and manipulation
  </li>
  <li>
    Helped onboard thirteen graduate and undergraduate collaborators
  </li>
</ul>

<Experience
  role="AAS in Commercial Photography"
  institution="Seattle Central College"
  gpa="3.6"
  :when="[2013, 2015]"
/>

## Work

<Experience
  role="Teaching Assistant"
  institution="Western Washington University"
  location="Bellingham, WA"
  :when="2024"
/>

<ul class="bullets">
  <li>
    Ran labs, graded assignments, captioned videos, protored exams, and addressed student feedback on assignments
  </li>
</ul>

<Experience
  role="Technical Artist"
  institution="Ten Gun Design"
  location="Edmonds, WA"
  :when="[2016, 2020]"
/>

<ul class="bullets">
  <li>
    Optimized Hololens graphics for the Holoisland demo to run at 60FPS, up from as low as 10FPS
  </li>
  <li>
    Shipped a point-and-click adventure game for training Microsoft retail employees
  </li>
  <li>
    Delivered a Unity-based choose-your-own-adventure film toolkit to Microsoft for training videos
  </li>
  <li>
    Lead development of a yearlong Unity VR automotive demo with a networked AR companion app
  </li>
  <li>
    Wrote over 35 plugins and apps for artists to automate common tasks and simplify workflows
  </li>
  <li>
    Produced hundreds of images and videos for Microsoft, Amazon, Paccar, Micron, Funko, and PowerA
  </li>
</ul>

<Experience
  role="3D Scanning Specialist"
  institution="Prizmiq"
  location="Seattle, WA"
  :when="[2015, 2016]"
/>

<ul class="bullets">
  <li>
    Built and operated a photogrammetry content pipeline for web-based 3D e-commerce visuals, delivering 100 assets to Shoes.com, Dye Precision, and the Burke Museum
  </li>
</ul>

<style>
ul.bullets > li {
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: -0.75rem;
    top: 0.7rem;
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    background-color: var(--text);
  }
}

.page-heading {
  display: grid;
  grid-template-columns: 1fr max-content;
  align-items: end;

  & > a {
    margin-bottom: 0.1875rem;
  }
}

h1, p {
  margin: 0rem;
}

.contact {
  display: block;
  text-align: center;

  & > li {
    display: inline;

    & > address {
      display: inline;
    }

    &:not(:first-child)::before {
      display: inline;
      content: " | ";
    }
  }
}
</style>
