# TimeKeep

**TimeKeep** is a minimalist, aesthetically pleasing time management web application. It combines a high-precision Stopwatch and a visual Countdown Timer into a unified "Soft UI" interface. Designed with focus and tranquility in mind, it features a calming pastel color palette and smooth animations.

## ✨ Key Features

* **Dual Functionality:** Seamlessly switch between a Stopwatch (with lap recording) and a Countdown Timer.
* **Drift-Free Accuracy:** Utilizes `Date.now()` delta calculation instead of standard intervals to ensure time tracking remains precise over long periods.
* **Dynamic Theming Engine:** Includes 5 distinct pastel themes (Matcha, Berry, Ocean, Sunset, Lavender).
* **Theme Persistence:** Automatically saves the user's preferred theme to `localStorage`.
* **Visual Feedback:** Features an adaptive SVG circular progress ring for the timer that visually depletes as time counts down.
* **Responsive Design:** Fully responsive layout built with Tailwind CSS, optimized for both desktop and mobile devices.

## 🛠️ Technologies Used

* **HTML5:** Semantic markup structure.
* **CSS3 & Tailwind CSS:** Styled using a combination of modern CSS Variables (for theming) and Tailwind utility classes (via CDN).
* **JavaScript (ES6+):** Vanilla JavaScript handling DOM manipulation, time logic, and state management.
* **Phosphor Icons:** extensive, flexible icon family for UI elements.
