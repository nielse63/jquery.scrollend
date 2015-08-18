/* http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+bash */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
	Prism = function() {
		var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i,
			t = _self.Prism = {
				util: {
					encode: function(e) {
						return e instanceof n ? new n(e.type, t.util.encode(e.content), e.alias) : "Array" === t.util.type(e) ? e.map(t.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
					},
					type: function(e) {
						return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
					},
					clone: function(e) {
						var n = t.util.type(e);
						switch(n) {
							case "Object":
								var a = {};
								for(var r in e) e.hasOwnProperty(r) && (a[r] = t.util.clone(e[r]));
								return a;
							case "Array":
								return e.map && e.map(function(e) {
									return t.util.clone(e)
								})
						}
						return e
					}
				},
				languages: {
					extend: function(e, n) {
						var a = t.util.clone(t.languages[e]);
						for(var r in n) a[r] = n[r];
						return a
					},
					insertBefore: function(e, n, a, r) {
						r = r || t.languages;
						var i = r[e];
						if(2 == arguments.length) {
							a = arguments[1];
							for(var l in a) a.hasOwnProperty(l) && (i[l] = a[l]);
							return i
						}
						var o = {};
						for(var s in i)
							if(i.hasOwnProperty(s)) {
								if(s == n)
									for(var l in a) a.hasOwnProperty(l) && (o[l] = a[l]);
								o[s] = i[s]
							}
						return t.languages.DFS(t.languages, function(t, n) {
							n === r[e] && t != e && (this[t] = o)
						}), r[e] = o
					},
					DFS: function(e, n, a) {
						for(var r in e) e.hasOwnProperty(r) && (n.call(e, r, e[r], a || r), "Object" === t.util.type(e[r]) ? t.languages.DFS(e[r], n) : "Array" === t.util.type(e[r]) && t.languages.DFS(e[r], n, r))
					}
				},
				highlightAll: function(e, n) {
					for(var a, r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), i = 0; a = r[i++];) t.highlightElement(a, e === !0, n)
				},
				highlightElement: function(a, r, i) {
					for(var l, o, s = a; s && !e.test(s.className);) s = s.parentNode;
					s && (l = (s.className.match(e) || [, ""])[1], o = t.languages[l]), a.className = a.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, s = a.parentNode, /pre/i.test(s.nodeName) && (s.className = s.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l);
					var u = a.textContent,
						c = {
							element: a,
							language: l,
							grammar: o,
							code: u
						};
					if(u && (c.code = u.replace(/^(?:\r?\n|\r)/, "")), !u || !o) return t.hooks.run("complete", c), void 0;
					if(t.hooks.run("before-highlight", c), r && _self.Worker) {
						var g = new Worker(t.filename);
						g.onmessage = function(e) {
							c.highlightedCode = n.stringify(JSON.parse(e.data), l), t.hooks.run("before-insert", c), c.element.innerHTML = c.highlightedCode, i && i.call(c.element), t.hooks.run("after-highlight", c), t.hooks.run("complete", c)
						}, g.postMessage(JSON.stringify({
							language: c.language,
							code: c.code
						}))
					} else c.highlightedCode = t.highlight(c.code, c.grammar, c.language), t.hooks.run("before-insert", c), c.element.innerHTML = c.highlightedCode, i && i.call(a), t.hooks.run("after-highlight", c), t.hooks.run("complete", c)
				},
				highlight: function(e, a, r) {
					var i = t.tokenize(e, a);
					return n.stringify(t.util.encode(i), r)
				},
				tokenize: function(e, n) {
					var a = t.Token,
						r = [e],
						i = n.rest;
					if(i) {
						for(var l in i) n[l] = i[l];
						delete n.rest
					}
					e: for(var l in n)
						if(n.hasOwnProperty(l) && n[l]) {
							var o = n[l];
							o = "Array" === t.util.type(o) ? o : [o];
							for(var s = 0; s < o.length; ++s) {
								var u = o[s],
									c = u.inside,
									g = !!u.lookbehind,
									f = 0,
									h = u.alias;
								u = u.pattern || u;
								for(var p = 0; p < r.length; p++) {
									var d = r[p];
									if(r.length > e.length) break e;
									if(!(d instanceof a)) {
										u.lastIndex = 0;
										var m = u.exec(d);
										if(m) {
											g && (f = m[1].length);
											var y = m.index - 1 + f,
												m = m[0].slice(f),
												v = m.length,
												k = y + v,
												b = d.slice(0, y + 1),
												w = d.slice(k + 1),
												N = [p, 1];
											b && N.push(b);
											var O = new a(l, c ? t.tokenize(m, c) : m, h);
											N.push(O), w && N.push(w), Array.prototype.splice.apply(r, N)
										}
									}
								}
							}
						}
					return r
				},
				hooks: {
					all: {},
					add: function(e, n) {
						var a = t.hooks.all;
						a[e] = a[e] || [], a[e].push(n)
					},
					run: function(e, n) {
						var a = t.hooks.all[e];
						if(a && a.length)
							for(var r, i = 0; r = a[i++];) r(n)
					}
				}
			},
			n = t.Token = function(e, t, n) {
				this.type = e, this.content = t, this.alias = n
			};
		if(n.stringify = function(e, a, r) {
				if("string" == typeof e) return e;
				if("Array" === t.util.type(e)) return e.map(function(t) {
					return n.stringify(t, a, e)
				}).join("");
				var i = {
					type: e.type,
					content: n.stringify(e.content, a, r),
					tag: "span",
					classes: ["token", e.type],
					attributes: {},
					language: a,
					parent: r
				};
				if("comment" == i.type && (i.attributes.spellcheck = "true"), e.alias) {
					var l = "Array" === t.util.type(e.alias) ? e.alias : [e.alias];
					Array.prototype.push.apply(i.classes, l)
				}
				t.hooks.run("wrap", i);
				var o = "";
				for(var s in i.attributes) o += s + '="' + (i.attributes[s] || "") + '"';
				return "<" + i.tag + ' class="' + i.classes.join(" ") + '" ' + o + ">" + i.content + "</" + i.tag + ">"
			}, !_self.document) return _self.addEventListener ? (_self.addEventListener("message", function(e) {
			var n = JSON.parse(e.data),
				a = n.language,
				r = n.code;
			_self.postMessage(JSON.stringify(t.util.encode(t.tokenize(r, t.languages[a])))), _self.close()
		}, !1), _self.Prism) : _self.Prism;
		var a = document.getElementsByTagName("script");
		return a = a[a.length - 1], a && (t.filename = a.src, document.addEventListener && !a.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll)), _self.Prism
	}();
"undefined" != typeof module && module.exports && (module.exports = Prism);;
Prism.languages.markup = {
	comment: /<!--[\w\W]*?-->/,
	prolog: /<\?[\w\W]+?\?>/,
	doctype: /<!DOCTYPE[\w\W]+?>/,
	cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
	tag: {
		pattern: /<\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			tag: {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					punctuation: /^<\/?/,
					namespace: /^[^\s>\/:]+:/
				}
			},
			"attr-value": {
				pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
				inside: {
					punctuation: /[=>"']/
				}
			},
			punctuation: /\/?>/,
			"attr-name": {
				pattern: /[^\s>\/]+/,
				inside: {
					namespace: /^[^\s>\/:]+:/
				}
			}
		}
	},
	entity: /&#?[\da-z]{1,8};/i
}, Prism.hooks.add("wrap", function(t) {
	"entity" === t.type && (t.attributes.title = t.content.replace(/&amp;/, "&"))
});;
Prism.languages.css = {
	comment: /\/\*[\w\W]*?\*\//,
	atrule: {
		pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
		inside: {
			rule: /@[\w-]+/
		}
	},
	url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
	string: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
	property: /(\b|\B)[\w-]+(?=\s*:)/i,
	important: /\B!important\b/i,
	"function": /[-a-z0-9]+(?=\()/i,
	punctuation: /[(){};:]/
}, Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css), Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
	style: {
		pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/i,
		inside: {
			tag: {
				pattern: /<style[\w\W]*?>|<\/style>/i,
				inside: Prism.languages.markup.tag.inside
			},
			rest: Prism.languages.css
		},
		alias: "language-css"
	}
}), Prism.languages.insertBefore("inside", "attr-value", {
	"style-attr": {
		pattern: /\s*style=("|').*?\1/i,
		inside: {
			"attr-name": {
				pattern: /^\s*style/i,
				inside: Prism.languages.markup.tag.inside
			},
			punctuation: /^\s*=\s*['"]|['"]\s*$/,
			"attr-value": {
				pattern: /.+/i,
				inside: Prism.languages.css
			}
		},
		alias: "language-css"
	}
}, Prism.languages.markup.tag));;
Prism.languages.clike = {
	comment: [{
		pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
		lookbehind: !0
	}, {
		pattern: /(^|[^\\:])\/\/.*/,
		lookbehind: !0
	}],
	string: /("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
	"class-name": {
		pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
		lookbehind: !0,
		inside: {
			punctuation: /(\.|\\)/
		}
	},
	keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	"boolean": /\b(true|false)\b/,
	"function": /[a-z0-9_]+(?=\()/i,
	number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,
	operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,
	punctuation: /[{}[\];(),.:]/
};;
Prism.languages.javascript = Prism.languages.extend("clike", {
	keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,
	number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
	"function": /(?!\d)[a-z0-9_$]+(?=\()/i
}), Prism.languages.insertBefore("javascript", "keyword", {
	regex: {
		pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: !0
	}
}), Prism.languages.insertBefore("javascript", "class-name", {
	"template-string": {
		pattern: /`(?:\\`|\\?[^`])*`/,
		inside: {
			interpolation: {
				pattern: /\$\{[^}]+\}/,
				inside: {
					"interpolation-punctuation": {
						pattern: /^\$\{|\}$/,
						alias: "punctuation"
					},
					rest: Prism.languages.javascript
				}
			},
			string: /[\s\S]+/
		}
	}
}), Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
	script: {
		pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/i,
		inside: {
			tag: {
				pattern: /<script[\w\W]*?>|<\/script>/i,
				inside: Prism.languages.markup.tag.inside
			},
			rest: Prism.languages.javascript
		},
		alias: "language-javascript"
	}
});;
Prism.languages.bash = Prism.languages.extend("clike", {
	comment: {
		pattern: /(^|[^"{\\])#.*/,
		lookbehind: !0
	},
	string: {
		pattern: /("|')(\\?[\s\S])*?\1/,
		inside: {
			property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^\}]+\})/
		}
	},
	number: {
		pattern: /([^\w\.])-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,
		lookbehind: !0
	},
	"function": /\b(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)\b/,
	keyword: /\b(if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/
}), Prism.languages.insertBefore("bash", "keyword", {
	property: /\$([a-zA-Z0-9_#\?\-\*!@]+|\{[^}]+\})/
}), Prism.languages.insertBefore("bash", "comment", {
	important: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/
});;
