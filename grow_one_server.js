// Gets this levels of servers
var server = args[0];

// Check Root Access
if (hasRootAccess(server)) {

	var max_money = getServerMaxMoney(server);
	var available_money = getServerMoneyAvailable(server);

	if (available_money < max_money) {
		while (available_money < max_money) {
			grow(server);
			available_money = getServerMoneyAvailable(server);
		}
	} 
}


