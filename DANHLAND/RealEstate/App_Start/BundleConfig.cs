using System.Web;
using System.Web.Optimization;

namespace RealEstate
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/js/extreme").Include("~/Scripts/jszip.min.js", "~/Scripts/dx.all.js", "~/Scripts/globalize.min.js"));
            bundles.Add(new StyleBundle("~/Content/css/extreme").Include("~/Content/css/dx.common.css", "~/Content/css/dx.light.css"));
            bundles.Add(new StyleBundle("~/Content/css/bundle").Include("~/Content/css/style.bundle.css"));
            bundles.Add(new ScriptBundle("~/js/libs").Include("~/Scripts/core.js"));
            bundles.Add(new StyleBundle("~/Content/css/site").Include(
                      "~/Content/css/site.css"));
            bundles.Add(new ScriptBundle("~/js/login").Include("~/Content/plugins/global/plugins.bundle.js", "~/Content/plugins/global/plugins.bundle.js", "~/Scripts/login.js"));
            BundleTable.EnableOptimizations = true;
        }
    }
}
