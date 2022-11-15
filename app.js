// Create variables
const addMovieModalElement = document.getElementById('add-modal');
const startAddMovieModal = document.querySelector('header button');
const backdropElement = document.getElementById('backdrop');

const cancelAddMovieButton = addMovieModalElement.querySelector('.btn--passive');
const confirmAddMovieButton = addMovieModalElement.querySelector('.btn--success');
const addUserInput = addMovieModalElement.querySelectorAll('input');

const entryTextSection = document.getElementById('entry-text');
const listRoot = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

// Create functions
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const toggleBackdrop = () => {
  backdropElement.classList.toggle('visible');
};

const showMovieModal = () => {
  addMovieModalElement.classList.toggle('visible');
  toggleBackdrop();
};

const closeMovieModal = () => {
  addMovieModalElement.classList.remove('visible');
};

const clearMovieInput = () => {
  for (const usrInput of addUserInput) {
    usrInput.value = '';
  }
};

const closeMovieDeletion = () => {
  deleteMovieModal.classList.remove('visible');
  toggleBackdrop();
};

const deleteMovieHandler = movieId => {
  let movieIndex = 0;
  for (const movie of movies) {
    if(movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  listRoot.children[movieIndex].remove();
  closeMovieDeletion();
  updateUI();
};

const startDeleteMovieHandler = movieId => {
  deleteMovieModal.classList.add('visible'); // add visibility
  toggleBackdrop();

  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');
  cancelDeletionButton.removeEventListener('click', closeMovieDeletion);

  cancelDeletionButton.addEventListener('click', closeMovieDeletion);
  confirmDeletionButton.addEventListener('click', () => {deleteMovieHandler(movieId);});
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInput();
};

const renderMovieElementHandler = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = 
  `
  <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}"/>
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5</p>
  </div>
  `;

  newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
  listRoot.append(newMovieElement);
};

const addMovieHandler = () => {
  const titleValue = addUserInput[0].value;
  const imageUrlValue = addUserInput[1].value;
  const ratingValue = addUserInput[2].value;

  if (
      titleValue.trim() === '' ||
      imageUrlValue.trim() === '' ||
      ratingValue.trim() === '' ||
      +ratingValue < 1 ||
      +ratingValue > 5
      ) {
        alert('Please enter a valid value (rating between 1 and 5');
        return;
    }

    const newMovie = {
      id: Math.random().toString(),
      title: titleValue,
      image: imageUrlValue,
      rating: ratingValue
    };

    movies.push(newMovie);
    console.log(movies);

    clearMovieInput();
    closeMovieModal();
    toggleBackdrop();
    renderMovieElementHandler(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
    updateUI();
};

const removeBackdropHandler = () => {
  closeMovieModal();
  clearMovieInput();
  closeMovieDeletion();
};

startAddMovieModal.addEventListener('click', showMovieModal);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
backdropElement.addEventListener('click', removeBackdropHandler);