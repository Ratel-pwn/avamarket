import React, { useState } from 'react';
import { Workflow, ArrowLeft, ChevronRight, ShieldCheck, BadgeCheck, User as UserIcon, Download, Code, Eye } from 'lucide-react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Footer from '../components/Footer';
import difysvg from '../assets/dify.ai.svg';

const DetailPage = ({ item, type = 'template', onBack }) => {
  const [selectedPlatform, setSelectedPlatform] = useState(
    item.dslFiles?.[0]?.platformName || 'Dify'
  );

  const renderTechStack = () => (
    <div className="flex items-center space-x-2 mb-6">
      {item.labels.slice(0, 3).map((label, index) => (
        <span key={index} className="tech-tag">
          {label}
        </span>
      ))}
      {item.labels.length > 3 && (
        <span className="dropdown-item px-2 rounded-card border border-[var(--primary-font-a05)]">+{item.labels.length - 3}</span>
      )}
    </div>
  );

  const renderMetadata = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <img
          src={item.author.avatar}
          alt={item.author.name}
          className="w-10 h-10 rounded-full border border-[var(--border-color)]"
        />
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-primary-font text-md roboto-mono-regular">{item.author.name}</span>
            {item.author.isOfficial ? (
              <span className="badge badge-official"><ShieldCheck className="badge-icon" /></span>
            ) : item.author.isVerified ? (
              <span className="badge badge-verified"><BadgeCheck className="badge-icon" /></span>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      </div>

      <div className="roboto-mono-regular text-sm text-[var(--secondary-font)]">
        Last updated: <span className="roboto-mono-light">{item.lastUpdate}</span>
      </div>

      <div className="roboto-mono-regular text-sm text-[var(--secondary-font)]">
        Downloads: <span className="roboto-mono-light">{item.downloads.toLocaleString()}</span>
      </div>
      
      <div className="flex gap-1 items-center roboto-mono-regular text-sm text-[var(--secondary-font)]">
        Category: 
        <span className="category-tag">
          {item.category}
        </span>
        <ChevronRight color="var(--primary-font-a80)" size={16} strokeWidth={1} />
        <span className="category-tag">
         {item.subcategory}
         </span>
      </div>
    </div>
  );


  const [showRawReadme, setShowRawReadme] = useState(false);

  const handleDownloadReadme = () => {
    try {
      const blob = new Blob([item.readme || ''], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${item.title?.replace(/\s+/g, '_') || 'README'}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-light-bg">
      <div className="page-container">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="nav-link"
          >
            <ArrowLeft size={12} strokeWidth={1}/> Back to Scenarios
          </button>
          {/* Dify场景标识 */}
          <div className="flex items-center gap-2">
            <img src={difysvg} style={{height: 16}} alt="Dify"/>
            <span className="text-sm text-secondary-font">Dify Scenario</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 flex flex-col justify-between mb-10">
            <div>
              <h1 className="text-primary-font mb-6">
                {item.title}
              </h1>
              {renderTechStack()}
            </div>
            {renderMetadata()}
            <button className="btn-primary items-center gap-2 w-full">
              <Download size={16}/> Download
            </button>
          </div>
          
          <div className="lg:col-span-2 flex flex-col">
            {(type === 'template') && (
              <div className="window window-inner-glow mb-6 window-refreshing">
                <div className="window-header">
                  <h3 className="window-title">Preview</h3>
                </div>
                <div className="window-body">
                  <div className="text-center">
                    {item.dslFiles &&
                    item.dslFiles.find(dsl => dsl.platformName === 'Dify')?.svgPreview ? (
                      <img
                        src={item.dslFiles.find(dsl => dsl.platformName === 'Dify')?.svgPreview}
                        alt="Dify Scenario Preview"
                        className="inline-block w-20 h-20 rounded-full border border-[var(--border-color)] mb-6 object-contain"
                      />
                    ) : (
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-[var(--border-color)] mb-6">
                        <Workflow size={40} strokeWidth={1.5} color="var(--icon-hint)" />
                      </div>
                    )}
                    <p className="window-loading max-w-md mx-auto roboto-mono-regular">
                      Interactive preview of the Dify scenario is loading from server ...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-card flex-grow border-b border-[var(--border-color)]">
          <div className="flex items-center justify-between border-b border-[var(--border-color)] px-6 py-2">
            <h2 className="window-title">Documentation</h2>
            <div className="flex items-center gap-2">
              <div className="toggler-group">
                <button
                  type="button"
                  className={`toggler-btn${!showRawReadme ? ' selected' : ''}`}
                  onClick={() => setShowRawReadme(false)}
                  title="Rendered"
                >
                  <Eye size={12} />
                </button>
                <button
                  type="button"
                  className={`toggler-btn${showRawReadme ? ' selected' : ''}`}
                  onClick={() => setShowRawReadme(true)}
                  title="View code"
                >
                  <Code size={12}/>
                </button>
              </div>
              <button type="button" className="btn-secondary" onClick={handleDownloadReadme}>
                <Download size={12}/> Download
              </button>
            </div>
          </div>
          {!showRawReadme ? (
            <div data-color-mode="light" className="p-12">
              <MarkdownPreview source={item.readme || ''} style={{ background: 'transparent' }} />
            </div>
          ) : (
            <pre className="text-sm text-secondary-font whitespace-pre-wrap leading-relaxed p-12">{item.readme || ''}</pre>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;
