import BasePage from './basePage';
class Order extends BasePage {

    load() {
        this.highlightSelectedStars();
        this.starsRating();
        document.querySelector('#submitRating').addEventListener("click", () => {
            this.sendRating();
        });
    }



    sendRating() {
        // salla.feedback.api.store({ order_id: order.id, comment: this.storeRating.comment, rating: this.storeRating.rating });
        // salla.feedback.api.shipping({ order_id: order.id, comment: this.shippingRating.comment, rating: this.shippingRating.rating });
        // salla.feedback.api.product({ order_id: order.id, products: this.productsRating });
        this.ratingValidation()
        document.querySelectorAll('.rating-section')
            .forEach((ratingSection) => {
                let type = ratingSection.dataset.type;
                let formsData = [];
                ratingSection.querySelectorAll('.rating-outer-form')
                    .forEach(function (form) {
                        let formData = {};
                        form.querySelectorAll('[name]')
                            .forEach(function (input) {
                                let inputData = salla.helpers.inputData(input.name, input.value, formData);
                                formData[inputData.name] = inputData.value;
                            });
                        formsData.push(formData);
                    });
                this.sendFeedback(type, formsData);
            });
        return;

    }

    sendFeedback(type, formsData) {
        if (!formsData || formsData.length == 0) {
            return;
        }
        salla.config.canLeave = false;
        salla.feedback.api[type](formsData[0])
            .then(function () {
                salla.config.canLeave = true;
                if (formsData.length > 1) {
                    sendFeedback(type, formsData.slice(1));
                }
            }).catch(error => salla.config.canLeave = true);
    }

    ratingValidation() {
        let errorMsg = '';
        document.querySelectorAll('.rating-section')
            .forEach((ratingSection) => {
                ratingSection.querySelectorAll('.rating-outer-form')
                    .forEach(rating => {
                        let ratingInput = rating.querySelector('.rating_hidden_input');
                        let commentInput = rating.querySelector('.comment');
                        let sectionTitle = rating.querySelector('.section-title');
                        let validationMessage = rating.querySelector('.validation-message');
                        if (ratingInput.value && commentInput.value && commentInput.value.length > 3) {
                            commentInput.classList.remove('has-error');
                            sectionTitle.classList.remove('has-error', 'text-red-400');
                            validationMessage.innerHTML = '';
                            return;
                        }
                        else if (commentInput.value && commentInput.value.length > 3) {
                            commentInput.classList.remove('has-error');
                        }else{
                            commentInput.classList.add('has-error');
                        } 
                        
                        sectionTitle.classList.add('has-error', 'text-red-400');

                        errorMsg = ratingInput.value
                            ? (salla.lang.get('common.errors.not_less_than_chars', { chars: 4 }) + ' ' + commentInput.getAttribute('placeholder'))
                            : (rating.dataset.starsError || salla.lang.get('pages.rating.rate_store_stars'));

                        validationMessage.innerHTML = errorMsg;
                    });

            });
        //Fire error to prevent sending rating
        if (errorMsg) {
            throw new Error(errorMsg);
        }
    }


    // for hovered star ---
    highlightSelectedStars() {
        let hoverClasses = ['hovered', 'text-theme-yellow']
        let rateElements = document.querySelectorAll('.rate-element');
        rateElements.forEach(rateElement => {
            let starElements = rateElement.querySelectorAll('.btn--star');
            rateElement.addEventListener('mouseout', () => {

                // remove hovered state from stars ---
                rateElement.querySelectorAll('.btn--star').forEach(star => {
                    star.classList.remove(...hoverClasses);
                })
            })

            starElements.forEach((starElement, index) => {
                starElement.addEventListener('mouseover', () => {
                    starElement.classList.add(...hoverClasses);
                    if (index <= 1) {
                        starElement.previousElementSibling.tagName === 'BUTTON' ? starElement.previousElementSibling.classList.add(...hoverClasses) : null;
                    } else {
                        for (let i = 0; i < index; i++) {
                            starElements[i].classList.add(...hoverClasses);
                        }
                    }
                })
                starElement.addEventListener('mouseout', () => {
                    starElement.classList.contains(...hoverClasses) ? starElement.classList.remove(...hoverClasses) : null;
                })
            })
        })
    }

    starsRating() {
        let selectedClasses = ['selected', 'text-theme-yellow']
        // Listen for form submissions
        salla.document.event.onSubmit('.rate-element', function (event) {
            // Prevent form from submitting
            event.preventDefault();

            // Get the selected star - activeElement is not supported in safari
            var activeStars = event.target.querySelectorAll('.btn--star.hovered');
            var selected = activeStars[activeStars.length - 1];
            if (!selected) return;
            var selectedIndex = parseInt(selected.dataset.star, 10),
                selectedText = selected.dataset.text;
            event.target.nextElementSibling.innerHTML = selectedText;
            event.target.querySelector('.rating_hidden_input').value = selectedIndex;

            // Get all stars in this form (only search in the form, not the whole document)
            // Loop through each star, and add or remove the `.selected` class to toggle highlighting
            event.target
                .querySelectorAll('.btn--star')
                .forEach(function (star, index) {

                    if (index < selectedIndex) {
                        // Selected star or before it, Add highlighting
                        star.classList.add(...selectedClasses);
                        return;
                    }
                    // After selected star, Remove highlight
                    star.classList.remove(...selectedClasses);
                });

            // Remove aria-pressed from any previously selected star
            var previousRating = event.target.querySelector('.star[aria-pressed="true"]');
            if (previousRating) {
                previousRating.removeAttribute('aria-pressed');
            }

            // Add aria-pressed role to the selected button
            selected.setAttribute('aria-pressed', true);
        });
    }

}

new Order;