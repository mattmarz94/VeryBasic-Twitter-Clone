import { tweetsData } from "./data.js"

const tweetInput = document.getElementById("tweet-input");
const tweetBtn = document.getElementById("tweet-btn");

tweetBtn.addEventListener("click", function() {
    console.log(tweetInput.value);
})

document.addEventListener("click", function(e){
    if (e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    } 
})

function handleLikeClick(tweetid){
    
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetid;
    })[0];
    targetTweetObj.likes++;
    console.log(targetTweetObj)

}

function getFeedHtml () {

    let feedHtml = ""

    tweetsData.forEach(function(tweet) {
        feedHtml += 
`<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class= "fa-comment-dots fa-regular" 
                    data-reply="${tweet.uuid}">
                    </i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class=" fa-heart fa-solid" 
                    data-like="${tweet.uuid}">
                    </i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class=" fa-retweet fa-solid 
                    data-retweet="${tweet.uuid}"">
                    </i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>`
    })
    return feedHtml;
}

function render() {
    document.getElementById("feed").innerHTML = getFeedHtml();
}
render();