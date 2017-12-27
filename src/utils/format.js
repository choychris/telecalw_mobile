export function formatTimeStamp(timestamp){
	  let displayTime = new Date(timestamp);
		return `${displayTime.getFullYear()}-${displayTime.getMonth()+1}-${displayTime.getDate()} ${displayTime.getHours()}:${((displayTime.getMinutes() < 10 ) ? '0' + displayTime.getMinutes() : displayTime.getMinutes() )}`;
}

