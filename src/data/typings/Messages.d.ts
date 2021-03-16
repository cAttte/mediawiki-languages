export default interface Messages {
    fallback: string | false
    rtl?: boolean
    capitalizeAllNouns?: boolean
    digitTransformTable?: unknown
    separatorTransformTable?: unknown
    fallback8bitEncoding?: string
    linkPrefixExtension?: boolean
    namespaceNames?: Record<"NS_MEDIA" | "NS_SPECIAL" | "NS_MAIN" | "NS_TALK" | "NS_USER" | "NS_USER_TALK" | "NS_PROJECT_TALK" | "NS_FILE" | "NS_FILE_TALK" | "NS_MEDIAWIKI" | "NS_MEDIAWIKI_TALK" | "NS_TEMPLATE" | "NS_TEMPLATE_TALK" | "NS_HELP" | "NS_HELP_TALK" | "NS_CATEGORY" | "NS_CATEGORY_TALK", string>
    namespaceAliases?: Record<"Image" | "Image_talk", string>
    namespaceGenderAliases?: unknown[]
    datePreferences?: string[]
    defaultDateFormat?: string
    datePreferenceMigrationMap?: string[]
    dateFormats?: Record<"mdy time" | "mdy date" | "mdy monthonly" | "mdy both" | "mdy pretty" | "dmy time" | "dmy date" | "dmy monthonly" | "dmy both" | "dmy pretty" | "ymd time" | "ymd date" | "ymd monthonly" | "ymd both" | "ymd pretty" | "ISO 8601 time" | "ISO 8601 date" | "ISO 8601 monthonly" | "ISO 8601 both" | "ISO 8601 pretty", string>
    bookstoreList?: Record<"BWB" | "OpenLibrary" | "Worldcat", string>
    magicWords?: Record<"!" | "anchorencode" | "articlepath" | "basepagename" | "basepagenamee" | "bidi" | "canonicalurl" | "canonicalurle" | "cascadingsources" | "contentlanguage" | "currentday" | "currentday2" | "currentdayname" | "currentdow" | "currenthour" | "currentmonth" | "currentmonth1" | "currentmonthabbrev" | "currentmonthname" | "currentmonthnamegen" | "currenttime" | "currenttimestamp" | "currentversion" | "currentweek" | "currentyear" | "defaultsort" | "defaultsort_noerror" | "defaultsort_noreplace" | "directionmark" | "displaytitle" | "displaytitle_noerror" | "displaytitle_noreplace" | "expectunusedcategory" | "filepath" | "forcetoc" | "formatdate" | "formatnum" | "fullpagename" | "fullpagenamee" | "fullurl" | "fullurle" | "gender" | "grammar" | "hiddencat" | "img_alt" | "img_baseline" | "img_border" | "img_bottom" | "img_center" | "img_class" | "img_framed" | "img_frameless" | "img_lang" | "img_left" | "img_link" | "img_manualthumb" | "img_middle" | "img_none" | "img_page" | "img_right" | "img_sub" | "img_super" | "img_text_bottom" | "img_text_top" | "img_thumbnail" | "img_top" | "img_upright" | "img_width" | "index" | "int" | "language" | "lc" | "lcfirst" | "localday" | "localday2" | "localdayname" | "localdow" | "localhour" | "localmonth" | "localmonth1" | "localmonthabbrev" | "localmonthname" | "localmonthnamegen" | "localtime" | "localtimestamp" | "localurl" | "localurle" | "localweek" | "localyear" | "msg" | "msgnw" | "namespace" | "namespacee" | "namespacenumber" | "newsectionlink" | "nocommafysuffix" | "nocontentconvert" | "noeditsection" | "nogallery" | "noindex" | "nonewsectionlink" | "notitleconvert" | "notoc" | "ns" | "nse" | "numberingroup" | "numberofactiveusers" | "numberofadmins" | "numberofarticles" | "numberofedits" | "numberoffiles" | "numberofpages" | "numberofusers" | "padleft" | "padright" | "pageid" | "pagelanguage" | "pagename" | "pagenamee" | "pagesincategory" | "pagesincategory_all" | "pagesincategory_files" | "pagesincategory_pages" | "pagesincategory_subcats" | "pagesinnamespace" | "pagesize" | "plural" | "protectionexpiry" | "protectionlevel" | "raw" | "rawsuffix" | "redirect" | "revisionday" | "revisionday2" | "revisionid" | "revisionmonth" | "revisionmonth1" | "revisionsize" | "revisiontimestamp" | "revisionuser" | "revisionyear" | "rootpagename" | "rootpagenamee" | "safesubst" | "scriptpath" | "server" | "servername" | "sitename" | "special" | "speciale" | "staticredirect" | "stylepath" | "subjectpagename" | "subjectpagenamee" | "subjectspace" | "subjectspacee" | "subpagename" | "subpagenamee" | "subst" | "tag" | "talkpagename" | "talkpagenamee" | "talkspace" | "talkspacee" | "toc" | "uc" | "ucfirst" | "urlencode" | "url_path" | "url_query" | "url_wiki", [number, ...string[]]>
    specialPageAliases?: Record<"Activeusers" | "Allmessages" | "AllMyUploads" | "Allpages" | "Ancientpages" | "ApiHelp" | "ApiSandbox" | "AutoblockList" | "Badtitle" | "Blankpage" | "Block" | "BlockList" | "Booksources" | "BotPasswords" | "BrokenRedirects" | "Categories" | "ChangeContentModel" | "ChangeCredentials" | "ChangeEmail" | "ChangePassword" | "ComparePages" | "Confirmemail" | "Contributions" | "CreateAccount" | "Deadendpages" | "DeletedContributions" | "Diff" | "DoubleRedirects" | "EditPage" | "EditTags" | "EditWatchlist" | "Emailuser" | "ExpandTemplates" | "Export" | "Fewestrevisions" | "FileDuplicateSearch" | "Filepath" | "GoToInterwiki" | "Import" | "Invalidateemail" | "JavaScriptTest" | "LinkAccounts" | "LinkSearch" | "Listadmins" | "Listbots" | "ListDuplicatedFiles" | "Listfiles" | "Listgrants" | "Listgrouprights" | "Listredirects" | "Listusers" | "Lockdb" | "Log" | "Lonelypages" | "Longpages" | "MediaStatistics" | "MergeHistory" | "MIMEsearch" | "Mostcategories" | "Mostimages" | "Mostinterwikis" | "Mostlinked" | "Mostlinkedcategories" | "Mostlinkedtemplates" | "Mostrevisions" | "Movepage" | "Mute" | "Mycontributions" | "MyLanguage" | "Mypage" | "Mytalk" | "Myuploads" | "Newimages" | "Newpages" | "NewSection" | "PageData" | "PageHistory" | "PageInfo" | "PageLanguage" | "PagesWithProp" | "PasswordPolicies" | "PasswordReset" | "PermanentLink" | "Preferences" | "Prefixindex" | "Protectedpages" | "Protectedtitles" | "Purge" | "RandomInCategory" | "Randompage" | "Randomredirect" | "Randomrootpage" | "Recentchanges" | "Recentchangeslinked" | "Redirect" | "RemoveCredentials" | "ResetTokens" | "Revisiondelete" | "RunJobs" | "Search" | "Shortpages" | "Specialpages" | "Statistics" | "Tags" | "TrackingCategories" | "Unblock" | "Uncategorizedcategories" | "Uncategorizedimages" | "Uncategorizedpages" | "Uncategorizedtemplates" | "Undelete" | "UnlinkAccounts" | "Unlockdb" | "Unusedcategories" | "Unusedimages" | "Unusedtemplates" | "Unwatchedpages" | "Upload" | "UploadStash" | "Userlogin" | "Userlogout" | "Userrights" | "Version" | "Wantedcategories" | "Wantedfiles" | "Wantedpages" | "Wantedtemplates" | "Watchlist" | "Whatlinkshere" | "Withoutinterwiki", string[]>
    linkTrail?: string
    linkPrefixCharset?: string
    preloadedMessages?: string[]
    digitGroupingPattern?: string
}
