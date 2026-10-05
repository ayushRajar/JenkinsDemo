define(['knockout', 'ojs/ojcore', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojformlayout', 'ojs/ojbutton', 'ojs/ojslider'],
    function(ko, oj) {
        function EmiCalculatorViewModel() { 
            this.loanAmount = ko.observable(100000); 
            this.interestRate = ko.observable(12);
            this.loanTenure = ko.observable(12); 
            this.emiResult = ko.observable('');

            var self = this;

            self.calculateEmi = function() {
                var p = parseFloat(self.loanAmount());
                var R = parseFloat(self.interestRate());
                var n = parseInt(self.loanTenure());

                if (isNaN(p) || isNaN(R) || isNaN(n) || n <= 0) {
                    self.emiResult('Please enter valid inputs');
                    return;
                }

                var r = R / 12 / 100;

                if (r === 0) {
                    self.emiResult((p / n).toFixed(2));
                    return;
                }

                var emi = (p * r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1);
                self.emiResult(emi.toFixed(2));
            }
        }
        return EmiCalculatorViewModel;
    });
