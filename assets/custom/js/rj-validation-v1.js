$(function() {
    // ---- VALIDATE INPUTS -----
    $(document).on("keypress", ".restrict", function(e) {
        // ----- KEYCODE -----
        /*
            - [A-Z]    = 65-90
            - [a-z]    = 97-122
            - [0-9]    = 48-57
            - [()]     = 40-41
            - [']      = 39
        */
        // ----- END KEYCODE -----

        let keyCode  = e.keyCode;
        let key      = e.key;
        let which    = e.which;
        let flag     = 0;

        let allowCharacters = $(this).data("allowcharacters").length > 2 ? $(this).data("allowcharacters").split("") : "[ ][ ]";
            allowCharacters.shift();
            allowCharacters.pop();
            allowCharacters = allowCharacters.join("");
        let arrCharacters   = allowCharacters.split(/\]\[/);

        arrCharacters.map(item => {
            item == "0-9" && (keyCode >= 48 && keyCode <= 57)  && flag++;
            item == "A-Z" && (keyCode >= 65 && keyCode <= 90)  && flag++;
            item == "a-z" && (keyCode >= 97 && keyCode <= 122) && flag++;
            item == "()"  && (keyCode >= 40 && keyCode <= 41)  && flag++;
            item == key   && flag++;
        })
        return flag > 0 ? true : false; 
    })
    // ---- VALIDATE INPUTS -----

})