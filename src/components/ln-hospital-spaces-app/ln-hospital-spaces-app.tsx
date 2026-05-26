import { Component, State, Prop, h } from '@stencil/core';

declare global {
  interface Window { navigation: any; }
}

@Component({
  tag: 'ln-hospital-spaces-app',
  styleUrl: 'ln-hospital-spaces-app.css',
  shadow: true,
})
export class LnHospitalSpacesApp {
  @Prop() basePath: string = "";
  @State() private relativePath = "";
  @Prop() apiBase: string;
  @Prop() spaceId: string;

componentWillLoad() {
    const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;

    const toRelative = (path: string) => {
      if (path.startsWith(baseUri)) {
        this.relativePath = path.slice(baseUri.length);
      } else {
        this.relativePath = "";
      }
    };

    window.navigation?.addEventListener("navigate", (ev: Event) => {
      if ((ev as any).canIntercept) { 
        (ev as any).intercept(); // Zabráni hard-refreshu stránky
      }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname);
  }

  private getActiveView(): 'evidencia' | 'priradenie' | 'prehlad' {
    if (this.relativePath.startsWith('priradenie')) return 'priradenie';
    if (this.relativePath.startsWith('prehlad')) return 'prehlad';
    return 'evidencia';
  }

  private navigateTo(view: string) {
    const targetUrl = `${this.basePath}/${view}`.replace(/\/+/g, '/');
    
    if (window.navigation) {
      window.navigation.navigate(targetUrl);
    } else {
      history.pushState(null, '', targetUrl);
      const baseUri = new URL(this.basePath, document.baseURI || "/").pathname;
      this.relativePath = location.pathname.slice(baseUri.length);
    }
  }

  render() {
    const activeView = this.getActiveView();
    return (
      <div class="app-layout" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', // Zmena z height na min-height pre lepší scroll
        backgroundColor: '#f0f4f8',
        color: '#1f1f1f' // Explicitne zamkneme základnú farbu textu na tmavú, keďže pozadie je svetlé
      }}>
        
        <header style={{ 
          backgroundColor: '#ffffff', 
          padding: '0 24px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          color: '#1f1f1f' // Ochrana textu v headeri pred dark mode
        }}>
          <div style={{ padding: '16px 0' }}>
            {/* Použijeme CSS premennú pre Material tému alebo fixnú farbu */}
            <h1 style={{ margin: '0', fontSize: '20px', color: 'var(--md-sys-color-primary, #1a73e8)' }}>
              Nemocnica - Systém priestorov (Ľubomír Novotný)
            </h1>
          </div>
          
          <md-tabs>
            <md-primary-tab 
              active={activeView === 'evidencia'} 
              onClick={() => this.navigateTo('evidencia')}>
              Evidencia priestorov (Správca)
            </md-primary-tab>
            
            <md-primary-tab 
              active={activeView === 'priradenie'} 
              onClick={() => this.navigateTo('priradenie')}>
              Správa priradení (Vedúci )
            </md-primary-tab>
            
            <md-primary-tab 
              active={activeView === 'prehlad'} 
              onClick={() => this.navigateTo('prehlad')}>
              Prehľad pre personál (Lekár/Sestra)
            </md-primary-tab>
          </md-tabs>
        </header>

        {/* Odstránený overflowY: 'auto', aby nevznikal druhý scrollbar */}
        <main style={{ flex: '1', padding: '24px', color: '#1f1f1f' }}>
  
          {activeView === 'evidencia' && (
            <ln-hospital-spaces-list
              role="spravca"
              api-base={this.apiBase}
              space-id="hospital-01"
            ></ln-hospital-spaces-list>
          )}

          {activeView === 'priradenie' && (
            <ln-hospital-spaces-list
              role="veduci"
              api-base={this.apiBase}
              space-id="hospital-01"
            ></ln-hospital-spaces-list>
          )}

          {activeView === 'prehlad' && (
            <ln-hospital-spaces-list
              role="general"
              api-base={this.apiBase}
              space-id="hospital-01"
            ></ln-hospital-spaces-list>
          )}

        </main>
      </div>
    );
  }
}