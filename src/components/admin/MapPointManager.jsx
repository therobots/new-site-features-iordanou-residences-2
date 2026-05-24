import React, { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Trash2, MapPin, Home, Landmark, Waves, Pencil } from 'lucide-react';

const categoryColors = {
  residence: 'bg-primary/10 text-primary border-primary/20',
  beach: 'bg-amber-50 text-amber-700 border-amber-200',
  landmark: 'bg-stone-100 text-stone-700 border-stone-200',
};

const categoryIcons = { residence: Home, beach: Waves, landmark: Landmark };

const emptyForm = {
  category: 'landmark',
  title_en: '', title_el: '',
  desc_en: '', desc_el: '',
  latitude: '', longitude: '',
  image_url: '', property_id: '',
};

export default function MapPointManager() {
  const { t } = useLanguage();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const { data: locations = [] } = useQuery({
    queryKey: ['map-locations'],
    queryFn: () => base44.entities.MapLocation.list(),
    initialData: [],
  });

  const { data: properties = [] } = useQuery({
    queryKey: ['properties'],
    queryFn: () => base44.entities.Property.list(),
    initialData: [],
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ['map-locations'] });

  const createMut = useMutation({
    mutationFn: (d) => base44.entities.MapLocation.create(d),
    onSuccess: () => { invalidate(); setOpen(false); setForm(emptyForm); },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, data }) => base44.entities.MapLocation.update(id, data),
    onSuccess: () => { invalidate(); setOpen(false); setEditing(null); setForm(emptyForm); },
  });
  const deleteMut = useMutation({
    mutationFn: (id) => base44.entities.MapLocation.delete(id),
    onSuccess: invalidate,
  });

  const openNew = () => { setEditing(null); setForm(emptyForm); setOpen(true); };
  const openEdit = (loc) => {
    setEditing(loc);
    setForm({
      category: loc.category || 'landmark',
      title_en: loc.title_en || '', title_el: loc.title_el || '',
      desc_en: loc.desc_en || '', desc_el: loc.desc_el || '',
      latitude: loc.latitude ?? '', longitude: loc.longitude ?? '',
      image_url: loc.image_url || '', property_id: loc.property_id || '',
    });
    setOpen(true);
  };

  const handleSave = () => {
    const payload = {
      ...form,
      latitude: parseFloat(form.latitude) || 0,
      longitude: parseFloat(form.longitude) || 0,
    };
    if (editing) updateMut.mutate({ id: editing.id, data: payload });
    else createMut.mutate(payload);
  };

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-body text-muted-foreground">{locations.length} map points</p>
        <Button size="sm" onClick={openNew} className="bg-primary hover:bg-primary/90 font-body gap-1.5">
          <Plus className="w-4 h-4" /> {t('addMapPoint')}
        </Button>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        {locations.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground font-body text-sm">
            <MapPin className="w-10 h-10 mx-auto mb-3 opacity-20" />
            No map points yet
          </div>
        ) : (
          <div className="divide-y divide-border">
            {locations.map(loc => {
              const CatIcon = categoryIcons[loc.category] || MapPin;
              return (
                <div key={loc.id} className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors">
                  {loc.image_url ? (
                    <img src={loc.image_url} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <CatIcon className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-body font-medium text-sm text-foreground truncate">{loc.title_en}</span>
                      <Badge className={`${categoryColors[loc.category]} border text-xs font-body`}>
                        {loc.category}
                      </Badge>
                    </div>
                    <span className="text-xs font-body text-muted-foreground">
                      {loc.latitude?.toFixed(4)}, {loc.longitude?.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => openEdit(loc)}>
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => deleteMut.mutate(loc.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">{editing ? t('edit') : t('addMapPoint')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <div>
              <Label className="font-body text-xs">{t('category')}</Label>
              <Select value={form.category} onValueChange={v => set('category', v)}>
                <SelectTrigger className="mt-1 font-body">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residence">Residence</SelectItem>
                  <SelectItem value="beach">Beach</SelectItem>
                  <SelectItem value="landmark">Landmark</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {form.category === 'residence' && (
              <div>
                <Label className="font-body text-xs">Linked Property</Label>
                <Select value={form.property_id} onValueChange={v => set('property_id', v)}>
                  <SelectTrigger className="mt-1 font-body">
                    <SelectValue placeholder="Select property…" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name_en}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="font-body text-xs">Title (EN)</Label>
                <Input className="mt-1 font-body" value={form.title_en} onChange={e => set('title_en', e.target.value)} />
              </div>
              <div>
                <Label className="font-body text-xs">Τίτλος (EL)</Label>
                <Input className="mt-1 font-body" value={form.title_el} onChange={e => set('title_el', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="font-body text-xs">Description (EN)</Label>
                <Input className="mt-1 font-body" value={form.desc_en} onChange={e => set('desc_en', e.target.value)} />
              </div>
              <div>
                <Label className="font-body text-xs">Περιγραφή (EL)</Label>
                <Input className="mt-1 font-body" value={form.desc_el} onChange={e => set('desc_el', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="font-body text-xs">{t('latitude')}</Label>
                <Input type="number" step="0.0001" className="mt-1 font-body" value={form.latitude} onChange={e => set('latitude', e.target.value)} placeholder="e.g. 39.3663" />
              </div>
              <div>
                <Label className="font-body text-xs">{t('longitude')}</Label>
                <Input type="number" step="0.0001" className="mt-1 font-body" value={form.longitude} onChange={e => set('longitude', e.target.value)} placeholder="e.g. 26.1639" />
              </div>
            </div>
            <div>
              <Label className="font-body text-xs">{t('image')} URL</Label>
              <Input className="mt-1 font-body" value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://…" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" className="font-body" onClick={() => setOpen(false)}>{t('close')}</Button>
              <Button
                className="bg-primary hover:bg-primary/90 font-body"
                onClick={handleSave}
                disabled={createMut.isPending || updateMut.isPending}
              >
                {t('save')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}