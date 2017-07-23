<script type="text/javascript">
    var visitorCountry = "US";
    var allowedCountry = ['IN', 'US'];
    function jsonpCallback(data) {
        if (data.country != "XX") {
            visitorCountry = data.country;
        }
        if (allowedCountry.indexOf(visitorCountry) < 0) {
            visitorCountry = "US";
        }
    }
</script>

<script src="https://ipinfo.io/json?token=ddc6e430491eec&callback=jsonpCallback"
        type="text/javascript"></script>