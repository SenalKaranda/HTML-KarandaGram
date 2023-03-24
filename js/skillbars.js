function loadSkills() {
  // Fetch the skills data from the specified URL
  fetch('../data/skills.json')
  .then(response => response.json())
  .then(skillsData => {
    // Get the container element to append the progress bars
    const container = document.getElementById("progress-container");

    // Loop through the skills data and create a progress bar and name element for each skill
    skillsData.forEach(skill => {
      const progressBar = document.createElement("progress");
      const nameElement = document.createElement("span");

      progressBar.classList.add("progress-bar");
      progressBar.setAttribute("value", skill.rating);
      progressBar.setAttribute("max", "100");
      nameElement.classList.add("skill-text");
      nameElement.textContent = skill.name;
	  nameElement.style.fontFamily = 'Righteous, sans-serif'

      container.appendChild(nameElement);
      container.appendChild(progressBar);
    });
  });
}

loadSkills()