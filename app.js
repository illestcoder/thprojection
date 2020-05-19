class App {
    constructor() {
        this.counter = JSON.parse(localStorage.getItem('counter')) || 1;
        this.photos1 = JSON.parse(window.localStorage.getItem('photo-column1')) || [];
        this.photos2 = JSON.parse(window.localStorage.getItem('photo-column2')) || [];
        this.photos3 = JSON.parse(window.localStorage.getItem('photo-column3')) || [];
        this.numOfLikes = JSON.parse(localStorage.getItem('.likes')) || 0;
        this.title = '';
        this.description = '';
        this.url = '';
        this.id = '';
        this.photoOpen = 0;

        this.$formContainer = document.querySelector('#form-container');
        this.$form = document.querySelector('#form');
        this.$formButtons = document.querySelector('#form-buttons');
        this.$formSubmit = document.querySelector('#upload-button');
        this.$formClose = document.querySelector('#upload-close-button');
        this.$photoUrl = document.querySelector('#photo-url');
        this.$photos = document.querySelector('#photos');
        this.$photosContainer = document.querySelector('#photos-container');
        this.$photoTitle = document.querySelector('#photo-title');
        this.$photoDescription = document.querySelector('#photo-description');
        this.$photoUrl = document.querySelector('#photo-url');
        this.$photoColumn1 = document.querySelector('#photo-column1');
        this.$photoColumn2 = document.querySelector('#photo-column2');
        this.$photoColumn3 = document.querySelector('#photo-column3');
        this.$likeTooltip = document.querySelector('.like-tooltip');
        // this.$commentTooltip = document.querySelector('.comment-tooltip');
        this.$deleteTooltip = document.querySelector('.delete-tooltip');
        this.$pic1 = document.querySelector('.pic1');
        this.$pic2 = document.querySelector('.pic2');
        this.$pic3 = document.querySelector('.pic3');
        this.$telescope = document.querySelector('.telescope');
        this.$telescopeContent = document.querySelector('.telescope-content');
        this.$telescopeTitle = document.querySelector('.telescope-title');
        this.$telescopeDescription = document.querySelector('.telescope-description');
        this.$telescopePhoto = document.querySelector('.telescope-photo');
        

        this.savePhotos();
        this.displayPhotos();
        this.addEventListeners();
    }

    addEventListeners() {
        document.body.addEventListener('click', event => {
            this.handleFormClick(event);
            this.magnifyPhoto(event);
            this.deletePhoto(event);
        });

        document.body.addEventListener('keypress', event => {
            this.handleFormClick(event);
        });

        this.$form.addEventListener('submit', event => {
            event.preventDefault();
            const hasUrl = this.$photoUrl.value;
            if (hasUrl && event) {
                //send the url as an array to do work
                const title = this.$photoTitle.value;
                const description = this.$photoDescription.value;
                const url = this.$photoUrl.value;
                this.addPhoto({title, description, url});
            }
        });

        // this.$likeTooltip.addEventListener('click', event => {

        // });
    }

    addLike(event) {
        // const likeClicked = event.target.closest('.toolbar-like') != null ? true : false;
        // if (likeClicked) {
        //     // toggle heart to turn red
        //     console.log(likeClicked);
        // }
    }

    deletePhoto(event) {
        if(!event.target.matches('.toolbar-delete')) return;
        // if(event.target.closest('.pic1')) {
        //     const id = event.target.dataset.id;
        //     this.photos1 = this.photos1.filter(pic1 => pic1.id == Number(id));
        //     this.renderPhotoColumns();
        //     return;
        // }
        if(event.target.closest('.pic2')) {
            const id = event.target.dataset.id;
            this.photos2 = this.photos2.filter(pic2 => pic2.id != Number(id));
            this.renderPhotoColumns();
            return;
        }
        // if(event.target.closest('.pic3')) {
        //     const id = event.target.dataset.id;
        //     this.photos3 = this.photos3.filter(pic3 => pic3.id != Number(id));
        //     this.renderPhotoColumns();
        //     return;
        // } else return;
    }

    handleFormClick(event) {
        const isFormClicked = this.$formContainer.contains(event.target);
        // const hasUrl = this.$photoUrl.value;
        if(isFormClicked) {
            this.openForm();
        } else {
            this.closeForm();
        }
    }

    magnifyPhoto(event) {
        if(event.target.matches('.toolbar-delete')) return;
        if(event.target.closest('.pic1')) {
            this.photoOpenStatus();
            this.renderTelescope(event);
            return ;
        } else if(event.target.closest('.pic2')) {
            this.photoOpenStatus();
            this.renderTelescope(event);
            return;
        } else if(event.target.closest('.pic3')) {
            this.photoOpenStatus();
            this.renderTelescope(event);
            return;
        } else {
            this.minimizePhoto();
            this.photoCloseStatus();
        }
    }

    minimizePhoto() {
        if (this.photoOpen === 1)
            this.$telescope.classList.toggle('magnify-telescope'); 
        else return;
    }

    photoOpenStatus() {
        this.photoOpen = 1;
    }
    
    photoCloseStatus() {
        this.photoOpen = 0;
    }

    renderTelescope(event) {
        const imgUrl = event.toElement.src;
        if(imgUrl != (undefined || 'https://icon.now.sh/heart') && this.photoOpen == 1 ) {
            this.$telescope.classList.toggle('magnify-telescope'); 
            this.$telescopeContent.innerHTML = ` <img class="telescope-photo" type="image" src="${imgUrl}"> `;
        }
    }

    counterHandler() {
        const countVal = localStorage.getItem('counter');
        localStorage.setItem('counter', JSON.stringify(1));
        // if (countVal === '1')
        //     localStorage.setItem('counter', JSON.stringify(2));
        // else if (countVal === '2')
        //     localStorage.setItem('counter', JSON.stringify(3));
        // else {
        //     localStorage.setItem('counter', JSON.stringify(1));
        // }
    }

    openForm() {
        this.$form.classList.add('form-open');
        this.$photoTitle.style.display = 'block';
        this.$photoDescription.style.display = 'block';
        this.$photoUrl.style.display = 'block';
        this.$formButtons.style.display = 'block';
    }

    closeForm() {
        this.$form.classList.remove('form-open');
        this.$photoTitle.style.display = 'none';
        this.$photoDescription.style.display = 'none';
        this.$photoUrl.style.display = 'none';
        this.$formButtons.style.display = 'none';
    }

    // const addPhoto = (title, desc, url) => {

    // }

    addPhoto({title, description, url}) {
        const countVal = localStorage.getItem('counter');
        if (countVal === '1') {
            const newPhoto = {
                title,
                description,
                url,
                id: this.photos1.length > 0 ? this.photos1[this.photos1.length-1].id + 1 : 1
            }
            this.photos1 = [...this.photos1, newPhoto];
            this.renderPhotoColumns();
            this.closeForm();
            this.counterHandler();
        } else if (countVal === '2') {
            const newPhoto = {
                title,
                description,
                url,
                id: this.photos2.length > 0 ? this.photos2[this.photos2.length-1].id + 1 : 1
            }
            this.photos2 = [...this.photos2, newPhoto];
            this.renderPhotoColumns();
            this.closeForm();
            this.counterHandler();
        } else {
            const newPhoto = {
                title,
                description,
                url,
                id: this.photos3.length > 0 ? this.photos3[this.photos3.length-1].id + 1 : 1
            }
            this.photos3 = [...this.photos3, newPhoto];
            this.renderPhotoColumns();
            this.closeForm();
            this.counterHandler();
        }
    }

    renderPhotoColumns() {
        this.savePhotos();
        this.displayPhotos();
    }

    savePhotos() {
        localStorage.setItem('photo-column1', JSON.stringify(this.photos1));
        localStorage.setItem('photo-column2', JSON.stringify(this.photos2));
        localStorage.setItem('photo-column3', JSON.stringify(this.photos3));
    }

    displayPhotos() {
        this.$photoColumn1.innerHTML = this.photos1.map( photos1 => this.renderPics(photos1)).join("");
        this.$photoColumn2.innerHTML = this.photos2.map( photos2 => this.renderPics(photos2)).join("");
        this.$photoColumn3.innerHTML = this.photos3.map( photos3 => this.renderPics(photos3)).join("");
        // console.log(this.photos1);
        // console.log(this.photos2);
        // console.log(this.photos3);
    }

    renderPics(photos) {
        console.log("heyo");
        console.log(photos);
        return `
        <div class="pic1" data-id=${photos.id}>   
            <img src="${photos.url}">
            <script id=${photos.likes}></script>
            <div class="toolbar-container">
                <div class="toolbar">
                    <img class="toolbar-delete" data-id=${photos.id} src="https://icon.now.sh/delete">
                    <img class="toolbar-like" data-id=${photos.id} src="https://icon.now.sh/heart">
                </div>
            </div>
        </div> 
    `;
    }
}

new App()
