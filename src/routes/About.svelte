<script lang="ts">
	const resume = '/jarrod-davis-resume.pdf';
</script>

<section>
	<h2>About Me</h2>
	<p>
		Hey! I’m Jarrod Davis, a full stack developer and software engineer who enjoys building
		delightful experiences and helpful tools. I’ve worked with numerous languages, frameworks, and
		libraries, with a significant focus on command-line utilities and web applications (frontend and
		backend). Here’s a sampling of the technologies I’ve worked with:
	</p>

	<ul>
		<li>
			A “traditional” Microsoft web stack ({@render csharp()}, {@render dotnet_fx()},
			{@render aspnet_mvc()})
		</li>

		<li>
			The modern Microsoft web stack ({@render csharp()}, {@render dotnet_core()},
			{@render aspnet_core()}, {@render efcore()})
		</li>

		<li>
			{@render nodejs()} as a web application backend (using frameworks like {@render express()} and
			{@render next()}) and serverless function runtime
		</li>

		<li>{@render phoenix()} on {@render elixir()} for full stack web applications</li>

		<li>
			JavaScript component frameworks like {@render react()}, {@render svelte()}, {@render vue()},
			and {@render angular()}
		</li>

		<li>
			Various frontend build setups (including {@render babel()}, {@render webpack()},
			{@render rollup()} and {@render vite()})
		</li>

		<li>
			Several CSS preprocessors and tools, including {@render stylus()}, {@render less()},
			{@render sass()}, and {@render postcss()}
		</li>

		<li>
			{@render mysql()} and {@render postgresql()} query authoring and schema update management
		</li>

		<li>
			{@render nodejs()}, {@render ruby()}, {@render python()}, {@render bash()}, and
			{@render zsh()} for command-line scripts and utilities
		</li>
	</ul>

	<p>
		Below you can see more details of my professional and educational experience. You can also
		<a href={resume}>view</a> or <a download href={resume}>download</a> or my resume as a PDF.
	</p>
</section>

{#snippet csharp()}
	<a href="https://dotnet.microsoft.com/en-us/languages/csharp">C#</a>
{/snippet}

{#snippet dotnet_fx()}
	<a href="https://learn.microsoft.com/en-us/dotnet/framework">.NET Framework</a>
{/snippet}

{#snippet aspnet_mvc()}
	<a href="https://github.com/aspnet/AspNetWebStack">ASP.NET MVC</a>
{/snippet}

{#snippet dotnet_core()}
	<a href="https://dotnet.microsoft.com">.NET (Core)</a>
{/snippet}

{#snippet aspnet_core()}
	<a href="https://dotnet.microsoft.com/apps/aspnet">ASP.NET Core</a>
{/snippet}

{#snippet efcore()}
	<a href="https://learn.microsoft.com/ef">Entity Framework Core</a>
{/snippet}

{#snippet nodejs()}
	<a href="https://nodejs.org">Node.js</a>
{/snippet}

{#snippet express()}
	<a href="https://expressjs.com">Express</a>
{/snippet}

{#snippet next()}
	<a href="https://nextjs.org">Next.js</a>
{/snippet}

{#snippet phoenix()}
	<a href="https://phoenixframework.org">Phoenix Framework</a>
{/snippet}

{#snippet elixir()}
	<a href="https://elixir-lang.org">Elixir</a>
{/snippet}

{#snippet react()}
	<a href="https://react.dev">React</a>
{/snippet}

{#snippet svelte()}
	<a href="https://svelte.dev">Svelte</a>
{/snippet}

{#snippet vue()}
	<a href="https://vuejs.org">Vue.js</a>
{/snippet}

{#snippet angular()}
	<a href="https://angular.io">Angular</a>
{/snippet}

{#snippet babel()}
	<a href="https://babeljs.io">Babel</a>
{/snippet}

{#snippet webpack()}
	<a href="https://webpack.js.org">webpack</a>
{/snippet}

{#snippet rollup()}
	<a href="https://rollupjs.org">Rollup</a>
{/snippet}

{#snippet vite()}
	<a href="https://vitejs.dev">Vite</a>
{/snippet}

{#snippet stylus()}
	<a href="https://stylus-lang.com">Stylus</a>
{/snippet}

{#snippet less()}
	<a href="https://lesscss.org">Less</a>
{/snippet}

{#snippet sass()}
	<a href="https://sass-lang.com">Sass/SCSS</a>
{/snippet}

{#snippet postcss()}
	<a href="https://postcss.org">PostCSS</a>
{/snippet}

{#snippet mysql()}
	<a href="https://www.mysql.com">MySQL</a>
{/snippet}

{#snippet postgresql()}
	<a href="https://www.postgresql.org">PostgreSQL</a>
{/snippet}

{#snippet ruby()}
	<a href="https://www.ruby-lang.org/">Ruby</a>
{/snippet}

{#snippet python()}
	<a href="https://www.python.org">Python</a>
{/snippet}

{#snippet bash()}
	<a href="https://www.gnu.org/software/bash/">Bash</a>
{/snippet}

{#snippet zsh()}
	<a href="https://www.zsh.org">Zsh</a>
{/snippet}
