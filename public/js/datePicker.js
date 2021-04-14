function initializeDatePicker() {
    let fromDate;
    let untilDate;
    // setup datepicker
    let pickerFrom = new Pikaday({
        field: $('#datepickerFrom')[0],
        onSelect: function() {
            let fromDate = this._d.toLocaleDateString().split(".");
            fromDate = ('0' + fromDate[0]).slice(-2) + '/'
                + ('0' + (fromDate[1]).slice(-2) + '/'
                    + fromDate[2]);

            fromDate += ' ' + this._d.toLocaleTimeString();
            console.log(fromDate);
        }
    });

    let pickerUntil = new Pikaday({ field: $('#datepickerUntil')[0] });

    console.log(pickerFrom);
    console.log(pickerUntil);
}