var app = new Vue({
  el: "#app",
  data: {
    population: 8916845,
    pctVaccinated: 66,
    symptomaticCovidChance: 2,
    efficacyInfection: 80,
    efficacyHospitalization: 70,
    chanceHospitalization: 10,
  },
  computed: {
    vaccinated: function() {
      return this.population * (this.pctVaccinated / 100);
    },
    unvaccinated: function() {
      return this.population * (1 - this.pctVaccinated / 100);
    },
    unvaccinatedInfected: function() {
      return this.unvaccinated * this.symptomaticCovidChance / 100;
    },
    vaccinatedInfected: function() {
      return this.vaccinated * this.symptomaticCovidChance / 100 * (1 - this.efficacyInfection / 100);
    },
    unvaccinatedHospitalized: function() {
      return this.unvaccinatedInfected * this.chanceHospitalization / 100;
    },
    vaccinatedHospitalized: function() {
      return this.vaccinatedInfected * this.chanceHospitalization / 100 * (1 - this.efficacyHospitalization / 100);
    },
    percentInfectedVaccianted: function() {
      let vaccinated = this.vaccinatedInfected;
      let unvaccinated = this.unvaccinatedInfected;
      let total = vaccinated + unvaccinated;
      return vaccinated / total * 100;
    },
    percentHospitalizedVaccianted: function() {
      let vaccinated = this.vaccinatedHospitalized;
      let unvaccinated = this.unvaccinatedHospitalized;
      let total = vaccinated + unvaccinated;
      return vaccinated / total * 100;
    }
  }
});

function formatNum(num) {
  return Math.round(num).toLocaleString('de');
}
