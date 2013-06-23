/**
 * Created with PyCharm.
 * User: mruskov
 * Date: 22/06/13
 * Time: 17:02
 * To change this template use File | Settings | File Templates.
 */
function init() {

//     acc = new Fx.Accordion($('#accordion h2'), $('#accordion .content'), {display: 2, alwaysHide: true});
//     new Fx.Accordion($('accordion'), '#accordion h2', '#accordion .content');
     new Fx.Accordion(accordion, '#accordion h2', '#accordion .content');

     climbLadder("risk");
     climbLadder("cost");

     console.log("Score initialized...");
}

// Ladder is "risk" or "cost"
function climbLadder(ladder) {
     // scores:
     var own = getScore("Own", ladder);
     var contender = getScore("Contender", ladder);
     var best = getScore("Best", ladder);

     if (own["value"] == best["value"]) {
        putOnLadder(ladder, 1, getUsername());
        putOnLadder(ladder, 2, "Contender");
        putOnLadder(ladder, 3, "Average");
     } else {  // own < best not possible
        putOnLadder(ladder, 1, "Best");
        if (own["value"] <= contender["value"]){
            putOnLadder(ladder, 2, getUsername());
            putOnLadder(ladder, 3, "Contender")
        } else {
            putOnLadder(ladder, 3, getUsername());
            putOnLadder(ladder, 2, "Contender");
        }
     }
}

function putOnLadder(ladder, step, name) {
     // score contains "value", "rank" and "when"
     // ladder is "risk" or "cost"
     score = getScore(name, ladder);
     $("#" + ladder + "_s" + step).text(name + ', ' + score["value"]);
     $("#" + ladder + "_r" + step).text(score["rank"]);
     $("#" + ladder + "_w" + step).text(score["when"]);

}