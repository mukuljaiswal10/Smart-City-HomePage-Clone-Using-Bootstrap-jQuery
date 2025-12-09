// counter number logic

// Step 1: Select all count elements
let counters = document.querySelectorAll(".count");

// Step 2: Function to run the counter
function runCounter(counter) {
  let target = +counter.getAttribute("data-target"); // target value
  let count = 0;

  let speed = target / 100; // speed calculation simple

  let update = setInterval(() => {
    count += speed;          // increase count
    counter.innerText = Math.floor(count);

    if (count >= target) {   // stop at target
      counter.innerText = target;
      clearInterval(update);
    }
  }, 20); // update every 20ms
}

// Step 3: Check when cards come into view
let section = document.querySelector(".row.my-5"); // your container
let started = false;

window.addEventListener("scroll", () => {
  let sectionTop = section.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight && !started) {
    counters.forEach(counter => runCounter(counter));
    started = true; // so it runs only once
  }
});
// end














// scroll to top logic :- 
const btn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  // 200px se zyada scroll kare to button show hoga
  if (window.scrollY > 150) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});

// Button click → smooth top scroll
btn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
