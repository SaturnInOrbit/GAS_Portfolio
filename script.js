// Tab Management
let activeTab = 'home';

// Tab titles for browser history
const titles = {
  home: 'Gender & Discourse Portfolio',
  discourse: 'Discourse Analysis – Gender & Discourse Portfolio',
  media: 'Media Audit – Gender & Discourse Portfolio',
  observation: 'Online Observation – Gender & Discourse Portfolio',
  policy: 'Policy Reflection – Gender & Discourse Portfolio',
  synthesis: 'Synthesis – Gender & Discourse Portfolio',
  about: 'About Me – Gender & Discourse Portfolio'
};

// Handle tab change
function handleTabChange(tab) {
  activeTab = tab;
  
  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Update all content sections
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    if (section.id === tab) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
  
  // Update navigation buttons
  const navButtons = document.querySelectorAll('.nav-button');
  navButtons.forEach(button => {
    if (button.dataset.tab === tab) {
      button.classList.add('active');
      button.setAttribute('aria-current', 'page');
    } else {
      button.classList.remove('active');
      button.removeAttribute('aria-current');
    }
  });
  
  // Update essay pill buttons
  const pillButtons = document.querySelectorAll('.essay-pill');
  pillButtons.forEach(button => {
    if (button.dataset.tab === tab) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
  
  // Update browser history and page title
  document.title = titles[tab];
  window.history.pushState({ tab }, '', `#${tab}`);
}

// Handle browser back/forward
function handlePopState(event) {
  if (event.state && event.state.tab) {
    const tab = event.state.tab;
    activeTab = tab;
    
    // Update sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
      if (section.id === tab) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
    
    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
      if (button.dataset.tab === tab) {
        button.classList.add('active');
        button.setAttribute('aria-current', 'page');
      } else {
        button.classList.remove('active');
        button.removeAttribute('aria-current');
      }
    });
    
    // Update essay pill buttons
    const pillButtons = document.querySelectorAll('.essay-pill');
    pillButtons.forEach(button => {
      if (button.dataset.tab === tab) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    
    document.title = titles[tab];
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Set initial state based on URL hash
  const hash = window.location.hash.slice(1);
  const validTabs = ['home', 'discourse', 'media', 'observation', 'policy', 'synthesis', 'about'];
  
  if (hash && validTabs.includes(hash)) {
    activeTab = hash;
    handleTabChange(hash);
  } else {
    // Set initial state for home
    window.history.replaceState({ tab: 'home' }, '', '#home');
  }
  
  // Add click listeners to navigation buttons
  const navButtons = document.querySelectorAll('.nav-button');
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tab = this.dataset.tab;
      handleTabChange(tab);
    });
  });
  
  // Add click listeners to essay pill buttons
  const pillButtons = document.querySelectorAll('.essay-pill');
  pillButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tab = this.dataset.tab;
      handleTabChange(tab);
    });
  });
  
  // Listen for browser back/forward
  window.addEventListener('popstate', handlePopState);
});
