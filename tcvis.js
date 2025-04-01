(function() {

    function decToUnsignedBin(decValue) {
        var dv = Math.abs(decValue);
        const unsBitButtons = document.getElementById("uns").children;

        var p = unsBitButtons.length -1;
        
        for (const unsBitButton of unsBitButtons) {
            var curTuple = Math.pow(2,p);
            var on = (curTuple <= dv);
            if (on) {
                unsBitButton.innerHTML = 1;
                dv -= curTuple;
            } else {
                unsBitButton.innerHTML = 0;
            }

            p--;
        }
    }

    function unsStr() {
        var st = "";
        const unsBitButtons = document.getElementById("uns").children;
        for (const unsBitButton of unsBitButtons) {
            st += unsBitButton.innerHTML;
        }

        return st;
    }

    function flip(bitChar) {
        flips = {
            "0" : "1",
            "1" : "0"
        }
        return flips[bitChar];
    }

    function getOcString(decValue, unsStr) {
        var ocString = unsStr;

        if (decValue < 0) {
            ocString = "1";
            for (i = 1; i < unsStr.length; i++) {
                ocString += flip(unsStr.charAt(i));
            }
        }
        return ocString;
    }

    function binIncrement(bits, pos, addend) {
        var nextAddend;

        if ((bits[pos]) && addend) {
            nextAddend = 1;
            bits[pos] = 0;;
        } else {
            nextAddend = 0;
            bits[pos] = (bits[pos] || addend);
        }

        if (pos == 0) {
            return bits;
        }
        return binIncrement(bits, pos-1, nextAddend);
    }

    function decToOnesCompStr(decValue) {
        var ocString = getOcString(decValue, unsStr());

        var i = 0;
        const ocBitButtons = document.getElementById("oc").children;
        for (const ocBitButton of ocBitButtons) {
            ocBitButton.innerHTML = ocString.charAt(i++);
        }
    }

    function decToTwosCompStr(decValue) {
        var ocString = getOcString(decValue, unsStr());
        var tcString = ""
        if (decValue >= 0) {
            tcString = ocString;
        } else {
            var ocList = []
            var i;
            for (i = 0; i < ocString.length; i++) {
                ocList.push(Number(ocString[i]));
            }
            console.log(ocList);

            var tcList = binIncrement(ocList, ocList.length-1, 1);
            for (i = 0; i < tcList.length; i++) {
                tcString += tcList[i].toString();
            }
        }

        i = 0;
        const tcBitButtons = document.getElementById("tc").children;
        for (const tcBitButton of tcBitButtons) {
            tcBitButton.innerHTML = tcString.charAt(i++);
        }
    }

    function init() {
        var decValue = document.getElementById("dec").value; 
        decToUnsignedBin(decValue);
        decToOnesCompStr(decValue);
        decToTwosCompStr(decValue);
    }

    window.addEventListener("load", init);
    document.getElementById("dec").addEventListener("change", init)
})();

