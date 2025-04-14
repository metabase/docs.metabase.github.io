var SHOW_ANNNUAL_PRICING = true;

var PRICES = {
    starter: {
        annual: 100,
        monthly: 120
    },
    premium: {
        annual: 300,
        monthly: 360
    }
}

var toggleElement = document.getElementById('js-pricing-toggle')

if(SHOW_ANNNUAL_PRICING) {
    toggleElement.classList.add('Toggle--on')
}

function updatePrice(priceElement, plan) {
    return priceElement.innerHTML = SHOW_ANNNUAL_PRICING ? plan.annual.toString() : plan.monthly.toString()
}

toggleElement.addEventListener('click', function() {
    this.classList.toggle('Toggle--on')
    SHOW_ANNNUAL_PRICING = !SHOW_ANNNUAL_PRICING
    updatePrice(document.getElementById('js-starter-price'), PRICES.starter)
    updatePrice(document.getElementById('js-premium-price'), PRICES.premium)
})
