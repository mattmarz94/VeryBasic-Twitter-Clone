import { tweetsData } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener("click", function(e){
    if (e.target.dataset.like){
        handleLikeClick(e.target.dataset.like);
    } else if (e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet);
    } else if (e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    } else if (e.target.id === "tweet-btn"){
        handleTweetBtn()
    }
})

function handleTweetBtn(){

    const tweetInput = document.getElementById("tweet-input");


    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@mattdoescode`,
            profilePic: `images/penguin.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        render()
        tweetInput.value = ""
    }
}

function handleLikeClick(tweetid){
    
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetid;
    })[0];
    
    if (targetTweetObj.isLiked){
        targetTweetObj.likes--;
    } else {
        targetTweetObj.likes++;
    }
        targetTweetObj.isLiked = !targetTweetObj.isLiked

    render()

}

function handleRetweetClick(tweetId){

    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId;
    })[0];

    if (targetTweetObj.isRetweeted){
        targetTweetObj.retweets--;
    } else {
        targetTweetObj.retweets++
    }

    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted

    render()

}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

function getFeedHtml () {

    let feedHtml = ""

    tweetsData.forEach(function(tweet) {

        const likeTweet = tweet.isLiked ? "liked" : ""
        const retweetTweet = tweet.isRetweeted ? "retweeted" : ""

        let repliesHtml = ""

        if (tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml += `
            <div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
            </div>`
            })
        }

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
                    <i class=" fa-heart fa-solid ${likeTweet}" 
                    data-like="${tweet.uuid}">
                    </i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class=" fa-retweet fa-solid ${retweetTweet}" 
                    data-retweet="${tweet.uuid}">
                    </i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div>
</div>`
    })
    return feedHtml;
}

function render() {
    document.getElementById("feed").innerHTML = getFeedHtml();
}
render();