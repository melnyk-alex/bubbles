var settings = {
    bubbles: {
        count: 300,
        size: 22,
        randomize: true,
        colors: 3,
        boomTimeout: 50
    },
    multithread: true
};

var bubbles = [];
var scores = 0;
// Tags
var block = document.getElementById("block");
var score = document.getElementById("score");

/**
 *
 */
function init() {
    // Generate shakeColors
    settings.bubbles.colors = shakeColors(settings.bubbles.colors);

    // Generate bubbles
    for (var i = 0; i < settings.bubbles.count; i++) {
        var bubbleObj = {
            color: settings.bubbles.colors[randomNumber(settings.bubbles.colors.length)]
        };
        bubbles.push(bubbleObj);

        // Make new bubble
        var bubble = makeBubble(bubbleObj.color.toString());

        bubble.onclick = onBubbleClick;

        // Add to block
        block.appendChild(bubble);
    }
}

/**
 *
 * @param bgColor
 * @returns {Element}
 */
function makeBubble(bgColor) {
    // Make new bubble
    var bubble = document.createElement("div");
    bubble.setAttribute("class", "bubble");

    // Set size (H; V)
    bubble.style.width = settings.bubbles.size + "px";
    bubble.style.height = settings.bubbles.size + "px";

    if (settings.bubbles.randomize) {
        bubble.style.backgroundColor = bgColor;
    }

    return bubble;
}

/**
 *
 */
function fakeBubble() {
    // Make new bubbleTag
    var bubbleTag = makeBubble();
    // Set class
    bubbleTag.setAttribute("class", "bubble fake");
    // Fix background color
    bubbleTag.style.backgroundColor = "transparent";

    // Set size (H; V)
    bubbleTag.style.width = settings.bubbles.size + 2 + "px";
    bubbleTag.style.height = settings.bubbles.size + 2 + "px";

    return bubbleTag;
}

// Handlers
var bubblesBoom = [];
var boom_lock = false;

/**
 *
 */
function onBubbleClick() {
    if (this.getAttribute("class").indexOf("fake") < 0) {

        var elm_idx = arrayIndexOf(this.parentNode.childNodes, this);
        bubblesBoom.push(elm_idx);
        findBubblesBoom(bubblesBoom, elm_idx);

        if (bubblesBoom.length > 2) {
            var parent = this.parentNode;

            var interval_fwd = setInterval(function () {
                if (bubblesBoom.length > 0) {
                    if (!boom_lock) {
                        boom_lock = true;

                        boomBubble(bubblesBoom.shift(), parent);
                    }

                    score.innerHTML = scores;
                } else {
                    clearInterval(interval_fwd);
                }
            }, settings.bubbles.boomTimeout);

            if (settings.multithread) {
                var interval_bck = setInterval(function () {
                    if (bubblesBoom.length > 0) {
                        if (!boom_lock) {
                            boom_lock = true;

                            boomBubble(bubblesBoom.pop(), parent);
                        }

                        score.innerHTML = scores;
                    } else {
                        clearInterval(interval_bck);
                    }
                }, settings.bubbles.boomTimeout);
            }
        } else {
            bubblesBoom = [];
        }
    }
}

/**
 *
 * @param elm_idx
 * @param bubblesBoom
 */
function findBubblesBoom(bubblesBoom, elm_idx) {
    var elm_top_idx = elm_idx - 20;
    var elm_bot_idx = elm_idx + 20;
    var elm_lft_idx = elm_idx - 1;
    var elm_rgt_idx = elm_idx + 1;

    if (elm_top_idx >= 0 && bubbles[elm_top_idx].color == bubbles[elm_idx].color) {
        if (bubblesBoom.indexOf(elm_top_idx) < 0) {
            bubblesBoom.push(elm_top_idx);
            findBubblesBoom(bubblesBoom, elm_top_idx);
        }
    }

    if (elm_bot_idx < bubbles.length && bubbles[elm_bot_idx].color == bubbles[elm_idx].color) {
        if (bubblesBoom.indexOf(elm_bot_idx) < 0) {
            bubblesBoom.push(elm_bot_idx);
            findBubblesBoom(bubblesBoom, elm_bot_idx);
        }
    }

    if (elm_lft_idx >= 0 && bubbles[elm_lft_idx].color == bubbles[elm_idx].color) {
        if (elm_idx % 20 != 0) {
            if (bubblesBoom.indexOf(elm_lft_idx) < 0) {
                bubblesBoom.push(elm_lft_idx);
                findBubblesBoom(bubblesBoom, elm_lft_idx);
            }
        }
    }

    if (elm_rgt_idx < bubbles.length && bubbles[elm_rgt_idx].color == bubbles[elm_idx].color) {
        if (elm_rgt_idx % 20 != 0) {
            if (bubblesBoom.indexOf(elm_rgt_idx) < 0) {
                bubblesBoom.push(elm_rgt_idx);
                findBubblesBoom(bubblesBoom, elm_rgt_idx);
            }
        }
    }
}

/**
 *
 * @param boomIndex
 * @param parent
 */
function boomBubble(boomIndex, parent) {
    scores += settings.bubbles.colors.indexOf(bubbles[boomIndex].color) + 1;
    // unlock
    boom_lock = false;

    bubbles[boomIndex].color = null;
    parent.replaceChild(fakeBubble(), parent.childNodes[boomIndex]);
}

// Invoke initialization
init();