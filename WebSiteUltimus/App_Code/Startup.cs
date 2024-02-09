using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(WebSiteUltimus.Startup))]
namespace WebSiteUltimus
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
