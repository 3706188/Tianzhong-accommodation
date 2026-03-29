const stays = [
  {
    id: 1,
    name: "Hotel A",
    price: 2000,
    type: ["paid"],
    image: "https://picsum.photos/400/300?random=1",
    address: "Tianzhong Street 1",
    amenities: ["WiFi", "Breakfast", "Air-con"],
    rating: 4.6,
    maxGuests: 3,
    description: "Comfortable hotel with private room",
  },
  {
    id: 2,
    name: "Temple Stay",
    price: 0,
    type: ["free", "hot water"],
    image: "https://picsum.photos/400/300?random=2",
    address: "45 Lotus Path, Hills",
    amenities: ["WiFi", "Breakfast", "Air-con"],
    rating: 4.6,
    maxGuests: 13,
    description:
      "A peaceful sanctuary offering spiritual calm before the big race.",
  },
  {
    id: 3,
    name: "School",
    price: 0,
    type: ["free", "sleeping bag"],
    image: "https://picsum.photos/400/300?random=3",
    address: "123 Runner Ave, Downtown",
    amenities: ["WiFi", "Breakfast", "Air-con"],
    rating: 4.6,
    maxGuests: 30,
    description:
      "Quiet classrooms repurposed for shared resting during the City Marathon.",
  },
];

// =============================================
// HAMBURGER MENU (runs on all pages)
// =============================================

// =============================================
// HOME PAGE – Featured Stays
// =============================================
if (document.body.classList.contains("home-page")) {
  const featured = stays.slice(0, 3);
  renderFeatured(featured);
}
function renderFeatured(data) {
  const wrapper = document.getElementById("featured-wrapper");
  wrapper.innerHTML = "";
  data.forEach((stay) => {
    wrapper.innerHTML += `
    <div class="card" onclick="location.href='detail.html?id=${stay.id}'" style="cursor:pointer;">
      <div class="card-img-wrap">
        <img src="${stay.image}" alt="${stay.name}" onerror="this.src='https://placehold.co/400x300?text=No+Image'">
        <span class="card-price-badge">${stay.price === 0 ? "FREE" : "$" + stay.price}</span>
        </div>
        <div class="card-body">
          <h3>${stay.name}</h3>
          <p class="card-address">📍 ${stay.address}</p>
          <div class="card-rating">⭐ ${stay.rating} · ${stay.maxGuests} guests max</div>
        </div>
      </div>`;
  });
}

// =============================================
// STAYS PAGE
// =============================================
if (document.body.classList.contains("stays-page")) {
  const container = document.getElementById("staysWrapper");
  renderStays(stays);

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const type = btn.dataset.filter;
      if (type === "all") renderStays(stays);
      else {
        const filtered = stays.filter((s) => {
          return s.type.includes(type);
        });
        renderStays(filtered);
      }
    });
  });

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  //Support Enter press
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") filterStaysBySearch(searchInput.value);
    });
  }
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      filterStaysBySearch(searchInput.value);
    });
  }
  function renderStays(data) {
    if (!container) return;
    const noResults = document.getElementById("noResults");
    const resultsCount = document.getElementById("resultsCount");
    if (resultsCount)
      resultsCount.textContent = `${data.length} stay${data.length !== 1 ? "s" : ""} found`;

    if (data.length === 0) {
      container.innerHTML = "";
      if (noResults) noResults.style.display = "block";
      return;
    }
    if (noResults) noResults.style.display = "none";
    container.innerHTML = "";
    data.forEach((stay) => {
      const tags = stay.type
        .map((tag) => {
          return `<span class="tag">${tag}</span>`;
        })
        .join("");

      const card = `
        <div class="card">
          <div class="card-img-wrap">
          <img src="${stay.image}" alt="${stay.name}"onerror="this.src='https://placehold.co/400x300?text=No+Image'">
            <span class="card-price-badge">${stay.price === 0 ? "FREE" : "$" + stay.price + "/night"}</span>
          </div>
          <div class="card-body">
            <h3>${stay.name}</h3>
            <p class="card-address">📍 ${stay.address}</p>
            <p class="card-desc">${stay.description}</p>
            <div class="card-rating">⭐ ${stay.rating} · Max ${stay.maxGuests} guests
          </div>
          <div class="tags">${tags}</div>
          <button class="btn btn-primary detail-btn" data-id="${stay.id}">View Details →</button>
        </div>
      `;
      container.innerHTML += card;
    });
  }
  function filterStaysBySearch(term) {
    const lower = term.trim().toLowerCase();
    if (!lower) return renderStays(stays);
    const found = stays.filter(
      (stay) =>
        stay.name.toLowerCase().includes(lower) ||
        stay.address.toLowerCase().includes(lower) ||
        stay.description.toLowerCase().includes(lower) ||
        stay.type.some((t) => t.toLowerCase().includes(lower)) ||
        stay.amenities.some((a) => a.toLowerCase().includes(lower)),
    );
    renderStays(found);
  }
}

// Event delegation for detail buttons
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".detail-btn");
  if (btn) {
    const id = btn.dataset.id;
    goDetail(id);
  }
});
function goDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}

function goBack() {
  window.location.href = "stays.html";
}

// =============================================
// DETAIL PAGE
// =============================================
if (document.body.classList.contains("detail-page")) {
  const detailContainer = document.getElementById("detail-container");
  const bookingSection = document.getElementById("booking-section");
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));
  const stay = stays.find((s) => s.id === id);
  if (stay && detailContainer) {
    const tags = stay.type
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");
    const amenities = stay.amenities
      .map((a) => `<span class="amenity-badge">${a}</span>`)
      .join("");

    detailContainer.innerHTML = `
        <div class="detail-card">
        <div class="detail-img-wrap">
          <img src="${stay.image}" alt="${stay.name}" onerror="this.src='https://placehold.co/600x300?text=No+Image'">
        </div>
        <div class="detail-info">
          <div class="detail-tags">${tags}</div>
          <h2>${stay.name}</h2>
          <p class="detail-address">📍 ${stay.address}</p>
          <div class="detail-meta">
            <span>⭐ ${stay.rating} rating</span>
            <span>👥 Up to ${stay.maxGuests} guests</span>
            <span class="detail-price ${stay.price === 0 ? "free" : "paid"}">
              ${stay.price === 0 ? "🆓 Free Stay" : `💰 $${stay.price} / night`}
            </span>
          </div>
          <p class="detail-desc">${stay.description}</p>
          <div class="amenities-section">
            <strong>What's included:</strong>
            <div class="amenities-list">${amenities}</div>
          </div>
        </div>
      </div>
    `;

    // Show the booking form
    if (bookingSection) {
      bookingSection.style.display = "block";
      // Store stay info in form for later use
      bookingSection.dataset.stayName = stay.name;
      bookingSection.dataset.stayId = stay.id;
      bookingSection.dataset.maxGuests = stay.maxGuests;
    }
  } else if (detailContainer) {
    detailContainer.innerHTML = `
      <div class="not-found">
        <p>😕 Stay not found.</p>
        <button class="btn btn-primary" onclick="location.href='stays.html'">Browse All Stays</button>
      </div>`;
  }
  // =============================================
  // Booking form submission
  // =============================================

  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateBookingForm()) {
        submitBooking();
      }
    });
  }
}
// =============================================
// FORM VALIDATION
// =============================================
function validateBookingForm() {
  let isValid = true;

  // Helper: show or clear error
  function setError(fieldId, message) {
    const el = document.getElementById(fieldId + "Error");
    const input = document.getElementById(fieldId);
    if (el) el.textContent = message;
    if (input) input.classList.toggle("input-error", !!message);
    if (message) isValid = false;
  }

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const guests = parseInt(document.getElementById("guests").value);
  const bibNumber = document.getElementById("bibNumber").value.trim();
  const raceCategory = document.getElementById("raceCategory").value;
  const agreeTerms = document.getElementById("agreeTerms").checked;

  const maxGuests =
    parseInt(document.getElementById("booking-section").dataset.maxGuests) ||
    99;

  // Name
  setError(
    "fullName",
    fullName.length < 2 ? "Please enter your full name." : "",
  );
  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  setError(
    "email",
    !emailRegex.test(email) ? "Please enter a valid email address." : "",
  );
  // Phone
  setError(
    "phone",
    phone.length < 8 ? "Please enter a valid phone number." : "",
  );
  // Guests
  if (!guests || guests < 1) {
    setError("guests", "Please enter at least 1 guest.");
  } else if (guests > maxGuests) {
    setError("guests", `This stay allows a maximum of ${maxGuests} guests.`);
  } else {
    setError("guests", "");
  }
  // Bib number (simple format check: non-empty, at least 4 chars)
  setError(
    "bibNumber",
    bibNumber.length < 4 ? "Please enter a valid bib number." : "",
  );
  // Race category
  setError(
    "raceCategory",
    !raceCategory ? "Please select your race category." : "",
  );
  // Terms
  setError(
    "agreeTerms",
    !agreeTerms ? "You must confirm you are a registered contestant." : "",
  );

  return isValid;
}

function submitBooking() {
  const name = document.getElementById("fullName").value.trim();
  const bib = document.getElementById("bibNumber").value.trim();
  const stayName = document.getElementById("booking-section").dataset.stayName;

  document.getElementById("confirmedName").textContent = name;
  document.getElementById("confirmedStay").textContent = stayName;
  document.getElementById("confirmedBib").textContent = bib;

  const modal = document.getElementById("successModal");
  if (modal) {
    modal.style.display = "flex";
    // Close on overlay click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  }
}

// =============================================
// NAVIGATION HELPERS
// =============================================
function goBack() {
  window.location.href = "stays.html";
}
