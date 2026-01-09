<cfif FindNoCase("Android", CGI.HTTP_USER_AGENT)>
	<!--- Redirect for Android devices --->
	<script>
		window.location.href = 'https://play.google.com/store/apps/details?id=com.io.waxxbrandz';
		setTimeout(() => {
			window.location.href = 'https://play.google.com/store/apps/details?id=com.io.waxxbrandz';
		}, 3000);
	</script>
<cfelseif FindNoCase("iPhone", CGI.HTTP_USER_AGENT) or FindNoCase("iPad", CGI.HTTP_USER_AGENT)>
	<!--- Redirect for iPhone or iPad devices --->
	<script>
		window.location.href = 'https://scanacartnfc.page.link/nMQh';
		setTimeout(() => {
			window.location.href = 'https://scanacartnfc.page.link/nMQh';
		}, 3000);
	</script>
</cfif>