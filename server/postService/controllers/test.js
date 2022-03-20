var result = [];
var post = {
    "famer": ["abc", "vac", "asda"],
    "lamer": ["cad", "dac", "dsas"]
}

var currentUser = "abc";

var temp = {};
temp["famed"] = post.famer.includes(currentUser);
temp["lamed"] = post.lamer.includes(currentUser);

result.push({
    title: "post.title",
    content: "post.content",
    "tag": "post.tag",
    "fame_count": "post.fame_count",
    "creator": "post.creator",
    "famed": post.famer.includes(currentUser),
    "lamed": post.lamer.includes(currentUser),
});

console.log(result);