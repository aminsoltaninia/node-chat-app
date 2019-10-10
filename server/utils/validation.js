var isRealString = (str)=>{
    return typeof str === 'string' && str.trim().length>0;//trim() jahae khalio barmidare
}

module.exports = {isRealString};